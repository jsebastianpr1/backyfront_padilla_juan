<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * GET /api/usuarios
     * Supports:
     * - ?skill=Name (Filter by professional skill)
     * - ?certification=Name (Filter by professional certification)
     * - ?role=admin|employer (Demographics shown to admin, hidden from employer)
     */
    public function index(Request $request)
    {
        try {
            $role = $request->query('role', 'employer');
            $skill = $request->query('skill');
            $certification = $request->query('certification');
            
            // Limit page size (default to 10 profiles, max 100 to prevent DOS)
            $perPage = min((int) $request->query('per_page', 10), 100);

            // Generate a unique cache key based on query filters, pagination, and requester's role
            $cacheKey = 'users:all:' . md5(serialize($request->all()));

            $data = Cache::remember($cacheKey, 3600, function () use ($role, $skill, $certification, $perPage) {
                $query = User::query();

                // 1. Filter by specific skill inside JSON array (SQLite JSON native search)
                if (!empty($skill)) {
                    $query->whereJsonContains('skills', $skill);
                }

                // 2. Filter by specific certification inside JSON array
                if (!empty($certification)) {
                    $query->whereJsonContains('certifications', $certification);
                }

                // 3. Blind CV visibility restriction: employers can only see active candidates
                if ($role !== 'admin') {
                    $query->where('is_active', true);
                }

                // 4. Memory optimization: paginate the query instead of using all()
                $paginated = $query->paginate($perPage);

                // 5. Anonymize/Strip demographic fields on the current page if requester is an employer
                if ($role !== 'admin') {
                    $paginated->getCollection()->transform(fn($user) => $user->toBlindArray());
                }

                return $paginated->toArray();
            });

            return response()->json([
                'status' => 'success',
                'data' => $data['data'] ?? [],
                'pagination' => [
                    'current_page' => $data['current_page'] ?? 1,
                    'last_page' => $data['last_page'] ?? 1,
                    'per_page' => $data['per_page'] ?? $perPage,
                    'total' => $data['total'] ?? 0,
                ],
            ], 200);

        } catch (\Throwable $e) {
            Log::error('Error in ProviEmplea UserController@index: ' . $e->getMessage());
            return response()->json([
                'status' => 'error',
                'message' => 'Error interno del servidor.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * POST /api/usuarios
     */
    public function store(Request $request)
    {
        try {
            // Validate demographics + professional parameters
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|email|unique:users,email',
                'age' => 'nullable|integer|min:18|max:100',
                'gender' => 'nullable|string|in:Masculino,Femenino,Otro,Prefiero no decirlo',
                'comuna' => 'nullable|string|max:100',
                'profession' => 'required|string|max:255',
                'skills' => 'nullable|array',
                'skills.*' => 'string|max:100',
                'certifications' => 'nullable|array',
                'certifications.*' => 'string|max:255',
                'references' => 'nullable|array',
                'references.*.name' => 'required_with:references|string|max:255',
                'references.*.phone' => 'nullable|string|max:50',
                'references.*.email' => 'nullable|email|max:255',
                'references.*.relation' => 'nullable|string|max:100',
                'is_active' => 'nullable|boolean'
            ]);

            $user = User::create($validated);

            // Invalidate all query caches on new data entry
            Cache::flush();

            return response()->json([
                'status' => 'success',
                'message' => 'Perfil de candidato creado exitosamente.',
                'data' => $user
            ], 201);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Error de validación de datos.',
                'errors' => $e->errors()
            ], 400);
        } catch (\Throwable $e) {
            Log::error('Error in ProviEmplea UserController@store: ' . $e->getMessage());
            return response()->json([
                'status' => 'error',
                'message' => 'Error interno del servidor.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * GET /api/usuarios/{id}
     */
    public function show(Request $request, $id)
    {
        try {
            $role = $request->query('role', 'employer');

            // Retrieve from cache using dynamic key
            $cacheKey = "users:member:{$id}:{$role}";

            $user = Cache::remember($cacheKey, 3600, function () use ($id, $role) {
                $candidate = User::findOrFail($id);

                // Employers cannot view inactive profiles directly
                if ($role !== 'admin' && !$candidate->is_active) {
                    throw new \Illuminate\Database\Eloquent\ModelNotFoundException("Inactive candidate profile");
                }

                // If not admin, output blind representation
                if ($role !== 'admin') {
                    return $candidate->toBlindArray();
                }

                return $candidate;
            });

            return response()->json([
                'status' => 'success',
                'data' => $user
            ], 200);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Candidato no encontrado o perfil inactivo.'
            ], 404);
        } catch (\Throwable $e) {
            Log::error("Error in ProviEmplea UserController@show for ID {$id}: " . $e->getMessage());
            return response()->json([
                'status' => 'error',
                'message' => 'Error interno del servidor.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * PUT /api/usuarios/{id}
     */
    public function update(Request $request, $id)
    {
        try {
            $user = User::findOrFail($id);

            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|email|unique:users,email,' . $id,
                'age' => 'nullable|integer|min:18|max:100',
                'gender' => 'nullable|string|in:Masculino,Femenino,Otro,Prefiero no decirlo',
                'comuna' => 'nullable|string|max:100',
                'profession' => 'required|string|max:255',
                'skills' => 'nullable|array',
                'skills.*' => 'string|max:100',
                'certifications' => 'nullable|array',
                'certifications.*' => 'string|max:255',
                'references' => 'nullable|array',
                'references.*.name' => 'required_with:references|string|max:255',
                'references.*.phone' => 'nullable|string|max:50',
                'references.*.email' => 'nullable|email|max:255',
                'references.*.relation' => 'nullable|string|max:100',
                'is_active' => 'nullable|boolean'
            ]);

            $user->update($validated);

            // Flush cache to reflect updates
            Cache::flush();

            return response()->json([
                'status' => 'success',
                'message' => 'Perfil de candidato actualizado exitosamente.',
                'data' => $user
            ], 200);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Candidato no encontrado.'
            ], 404);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Error de validación de datos.',
                'errors' => $e->errors()
            ], 400);
        } catch (\Throwable $e) {
            Log::error("Error in ProviEmplea UserController@update for ID {$id}: " . $e->getMessage());
            return response()->json([
                'status' => 'error',
                'message' => 'Error interno del servidor.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Toggle visibility (On / Off).
     *
     * PATCH /api/usuarios/{id}/status
     */
    public function status(Request $request, $id)
    {
        try {
            $user = User::findOrFail($id);

            // Validate status toggle
            $validated = $request->validate([
                'is_active' => 'required|boolean'
            ]);

            // Update candidate active visibility state
            $user->update([
                'is_active' => $validated['is_active']
            ]);

            // Clear caching to reflect visibility changes
            Cache::flush();

            $statusText = $user->is_active ? 'encendido (activo)' : 'apagado (inactivo)';

            return response()->json([
                'status' => 'success',
                'message' => "El perfil de candidato ha sido {$statusText} exitosamente.",
                'is_active' => $user->is_active
            ], 200);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Candidato no encontrado.'
            ], 404);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Error de validación de datos.',
                'errors' => $e->errors()
            ], 400);
        } catch (\Throwable $e) {
            Log::error("Error in ProviEmplea UserController@status for ID {$id}: " . $e->getMessage());
            return response()->json([
                'status' => 'error',
                'message' => 'Error interno del servidor.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * DELETE /api/usuarios/{id}
     */
    public function destroy($id)
    {
        try {
            $user = User::findOrFail($id);
            $user->delete();

            // Flush cache
            Cache::flush();

            return response()->json([
                'status' => 'success',
                'message' => 'Perfil de candidato eliminado del sistema.'
            ], 200);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Candidato no encontrado.'
            ], 404);
        } catch (\Throwable $e) {
            Log::error("Error in ProviEmplea UserController@destroy for ID {$id}: " . $e->getMessage());
            return response()->json([
                'status' => 'error',
                'message' => 'Error interno del servidor.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
