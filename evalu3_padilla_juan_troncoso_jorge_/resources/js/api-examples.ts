// ============================================================================
// EJEMPLOS AVANZADOS: Cómo consumir la API desde el Frontend
// ============================================================================

import { OpenAPI, DefaultService, ApiError } from '../../sdk_js/index';

// Configurar la URL base
OpenAPI.BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// ============================================================================
// 1. OBTENER LISTA DE CANDIDATOS CON DIFERENTES ROLES
// ============================================================================

/**
 * Ver candidatos como EMPLEADOR (Blind CV - perfiles anónimos)
 */
export async function getBlindCandidates() {
    try {
        const response = await DefaultService.listCandidates({
            role: 'employer',  // Retorna perfiles anónimos
            page: 1,
            perPage: 10
        });
        
        console.log(`Total de candidatos: ${response.count}`);
        console.log('Candidatos:', response.data);
        
        return response.data;
    } catch (error) {
        if (error instanceof ApiError) {
            console.error('Error API:', error.status, error.message);
        }
        throw error;
    }
}

/**
 * Ver candidatos como ADMIN (Perfil completo con datos demográficos)
 */
export async function getFullCandidates() {
    try {
        const response = await DefaultService.listCandidates({
            role: 'admin',  // Retorna perfil completo
            page: 1,
            perPage: 10
        });
        
        return response.data;
    } catch (error) {
        console.error('Error al obtener candidatos:', error);
        throw error;
    }
}

// ============================================================================
// 2. FILTRAR CANDIDATOS POR HABILIDADES Y CERTIFICACIONES
// ============================================================================

/**
 * Buscar candidatos con una habilidad específica
 */
export async function getCandidatesBySkill(skill: string) {
    try {
        const response = await DefaultService.listCandidates({
            role: 'employer',
            skill: skill,  // Filtrar por habilidad
            page: 1,
            perPage: 10
        });
        
        return response.data;
    } catch (error) {
        console.error(`Error buscando por skill "${skill}":`, error);
        throw error;
    }
}

/**
 * Buscar candidatos por certificación
 */
export async function getCandidatesByCertification(certification: string) {
    try {
        const response = await DefaultService.listCandidates({
            role: 'employer',
            certification: certification,  // Filtrar por certificación
            page: 1,
            perPage: 10
        });
        
        return response.data;
    } catch (error) {
        console.error(`Error buscando por certificación "${certification}":`, error);
        throw error;
    }
}

/**
 * Búsqueda avanzada con múltiples filtros
 */
export async function advancedSearch(filters: {
    skill?: string;
    certification?: string;
    page?: number;
    perPage?: number;
}) {
    try {
        const response = await DefaultService.listCandidates({
            role: 'employer',
            skill: filters.skill,
            certification: filters.certification,
            page: filters.page || 1,
            perPage: filters.perPage || 10
        });
        
        return response;
    } catch (error) {
        console.error('Error en búsqueda avanzada:', error);
        throw error;
    }
}

// ============================================================================
// 3. PAGINACIÓN
// ============================================================================

/**
 * Obtener página específica de candidatos
 */
export async function getPaginatedCandidates(pageNumber: number, itemsPerPage: number = 10) {
    try {
        const response = await DefaultService.listCandidates({
            role: 'employer',
            page: pageNumber,
            perPage: itemsPerPage
        });
        
        return {
            data: response.data,
            total: response.count,
            page: pageNumber,
            perPage: itemsPerPage,
            totalPages: Math.ceil((response.count || 0) / itemsPerPage)
        };
    } catch (error) {
        console.error('Error al obtener página:', error);
        throw error;
    }
}

// ============================================================================
// 4. GESTIONAR ESTADO DE CANDIDATOS
// ============================================================================

/**
 * Cambiar el estado de un candidato (activar/desactivar)
 */
export async function toggleCandidateStatus(candidateId: string): Promise<any> {
    try {
        const result = await DefaultService.toggleStatus(candidateId);
        console.log('Estado actualizado:', result);
        return result;
    } catch (error) {
        if (error instanceof ApiError) {
            if (error.status === 404) {
                console.error('Candidato no encontrado');
            } else if (error.status === 429) {
                console.error('Demasiadas peticiones. Intenta más tarde.');
            }
        }
        throw error;
    }
}

// ============================================================================
// 5. OBTENER DETALLES DE UN CANDIDATO
// ============================================================================

/**
 * Obtener información completa de un candidato
 */
export async function getCandidate(candidateId: string) {
    try {
        const candidate = await DefaultService.getCandidate(candidateId);
        console.log('Candidato obtenido:', candidate);
        return candidate;
    } catch (error) {
        if (error instanceof ApiError) {
            if (error.status === 404) {
                console.error('Candidato no existe');
            }
        }
        throw error;
    }
}

// ============================================================================
// 6. MANEJO DE ERRORES
// ============================================================================

/**
 * Función utilitaria para manejar errores de la API
 */
export function handleApiError(error: any): string {
    if (error instanceof ApiError) {
        switch (error.status) {
            case 429:
                return 'Ha excedido el límite de peticiones (60/minuto)';
            case 500:
                return 'Error del servidor. Intenta más tarde.';
            case 404:
                return 'Recurso no encontrado';
            case 400:
                return 'Solicitud inválida';
            default:
                return `Error ${error.status}: ${error.message}`;
        }
    }
    return 'Error desconocido: ' + error.message;
}

// ============================================================================
// 7. EJEMPLO DE COMPONENTE REACTIVO (VUE 3 / REACT)
// ============================================================================

// Para Vue 3:
export const candidateStore = {
    candidates: [],
    total: 0,
    currentPage: 1,
    perPage: 10,
    loading: false,
    error: null,
    
    async fetch(page: number = 1) {
        this.loading = true;
        this.error = null;
        try {
            const result = await getPaginatedCandidates(page, this.perPage);
            this.candidates = result.data;
            this.total = result.total;
            this.currentPage = page;
        } catch (error) {
            this.error = handleApiError(error);
        } finally {
            this.loading = false;
        }
    },
    
    async search(skill?: string, certification?: string) {
        this.loading = true;
        this.error = null;
        try {
            const result = await advancedSearch({
                skill,
                certification,
                page: 1,
                perPage: this.perPage
            });
            this.candidates = result.data;
            this.total = result.count;
            this.currentPage = 1;
        } catch (error) {
            this.error = handleApiError(error);
        } finally {
            this.loading = false;
        }
    },
    
    async toggleStatus(candidateId: string) {
        try {
            await toggleCandidateStatus(candidateId);
            await this.fetch(this.currentPage);
        } catch (error) {
            this.error = handleApiError(error);
        }
    }
};

// ============================================================================
// 8. CACHE DE CANDIDATOS EN LOCAL STORAGE
// ============================================================================

export class CandidateCache {
    private static CACHE_KEY = 'candidates_cache';
    private static CACHE_EXPIRY = 1000 * 60 * 5; // 5 minutos
    
    static set(candidates: any[], expiryMs: number = this.CACHE_EXPIRY) {
        const data = {
            candidates,
            timestamp: Date.now(),
            expiry: expiryMs
        };
        localStorage.setItem(this.CACHE_KEY, JSON.stringify(data));
    }
    
    static get(): any[] | null {
        const data = localStorage.getItem(this.CACHE_KEY);
        if (!data) return null;
        
        const parsed = JSON.parse(data);
        const isExpired = Date.now() - parsed.timestamp > parsed.expiry;
        
        if (isExpired) {
            localStorage.removeItem(this.CACHE_KEY);
            return null;
        }
        
        return parsed.candidates;
    }
    
    static clear() {
        localStorage.removeItem(this.CACHE_KEY);
    }
}

// Uso:
export async function getCandidatesWithCache() {
    // Intentar obtener del cache
    const cached = CandidateCache.get();
    if (cached) {
        console.log('Candidatos obtenidos del cache');
        return cached;
    }
    
    // Si no está en cache, obtener de la API
    const candidates = await getBlindCandidates();
    CandidateCache.set(candidates);
    return candidates;
}

// ============================================================================
// 9. DEBOUNCING PARA BÚSQUEDAS
// ============================================================================

export function debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout;
    
    return function executedFunction(...args: Parameters<T>) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Usar en búsqueda:
export const debouncedSearch = debounce((query: string) => {
    if (query.length > 2) {
        advancedSearch({ skill: query });
    }
}, 500);

// ============================================================================
// 10. VALIDACIÓN DE DATOS
// ============================================================================

export function validateCandidate(candidate: any): boolean {
    return (
        candidate &&
        candidate.id &&
        typeof candidate.id === 'string' &&
        (candidate.name === undefined || typeof candidate.name === 'string')
    );
}
