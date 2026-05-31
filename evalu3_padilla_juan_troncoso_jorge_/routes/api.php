<?php

use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider or application bootstrap
| within a group which is assigned the "api" middleware group.
|
*/

// Register all ProviEmplea routes with an explicit 60 requests/minute rate limiter
Route::middleware('throttle:60,1')->group(function () {
    
    // Custom Visibility Status Toggle ("Encender/Apagar")
    Route::patch('usuarios/{id}/status', [UserController::class, 'status']);

    // Standard RESTful CRUD endpoints for candidate perfiles
    Route::apiResource('usuarios', UserController::class);

});
