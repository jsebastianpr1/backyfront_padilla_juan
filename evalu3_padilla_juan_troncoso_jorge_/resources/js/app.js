import './bootstrap';
import { OpenAPI, DefaultService } from '../../sdk_js/index';

// Usar la URL base configurada en .env o el valor por defecto.
OpenAPI.BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const state = {
    role: 'employer',
    page: 1,
    perPage: 10,
};

function getContainer() {
    return document.getElementById('candidates-container');
}

function renderLoading() {
    const container = getContainer();
    if (!container) return;
    container.innerHTML = `
        <div class="col-span-full text-center py-8">
            <p class="text-gray-500">Cargando candidatos...</p>
        </div>
    `;
}

function renderEmpty() {
    const container = getContainer();
    if (!container) return;
    container.innerHTML = `
        <div class="col-span-full text-center py-8">
            <p class="text-gray-500">No hay candidatos disponibles.</p>
        </div>
    `;
}

async function loadCandidates(page = 1) {
    const container = getContainer();
    if (!container) return;

    state.page = page;
    renderLoading();

    try {
        const response = await DefaultService.listCandidates(
            undefined,
            undefined,
            state.role,
            state.page,
            state.perPage,
        );

        const candidates = Array.isArray(response?.data) ? response.data : [];
        displayCandidates(candidates);
    } catch (error) {
        console.error('Error cargando candidatos:', error);
        showError('Error al cargar candidatos: ' + (error?.message || 'Revise la consola.'));
        renderError();
    }
}

function displayCandidates(candidates) {
    const container = getContainer();
    if (!container) return;

    if (!candidates.length) {
        renderEmpty();
        return;
    }

    container.innerHTML = candidates.map(candidate => {
        const skills = Array.isArray(candidate.skills) ? candidate.skills.join(', ') : candidate.skills;
        const certifications = Array.isArray(candidate.certifications) ? candidate.certifications.join(', ') : candidate.certifications;

        return `
            <div class="bg-white p-4 rounded-lg shadow mb-4 border-l-4 border-blue-500">
                <h3 class="font-bold text-lg text-blue-600 dark:text-blue-400">${candidate.name || 'Sin nombre'}</h3>
                <p class="text-gray-700 font-medium">${candidate.profession || 'Sin profesión'}</p>
                <p class="text-gray-600 text-sm">Correo: ${candidate.email || 'Sin correo'}</p>
                <p class="text-gray-500 text-xs mt-1">
                    Edad: ${candidate.age ? candidate.age + ' años' : 'N/A'} | 
                    Género: ${candidate.gender || 'N/A'} | 
                    Comuna: ${candidate.comuna || 'N/A'}
                </p>
                <div class="mt-2 text-sm">
                    ${skills ? `<p class="text-gray-500"><strong class="text-gray-700">Habilidades:</strong> ${skills}</p>` : ''}
                    ${certifications ? `<p class="text-gray-500"><strong class="text-gray-700">Certificaciones:</strong> ${certifications}</p>` : ''}
                </div>
                <div class="mt-3 flex gap-2 flex-wrap">
                    <button type="button" onclick="viewCandidate('${candidate.id}')" class="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors">Ver Detalles</button>
                    <button type="button" onclick="toggleStatus('${candidate.id}')" class="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600 transition-colors">Cambiar Estado</button>
                </div>
            </div>
        `;
    }).join('');
}

function renderError() {
    const container = getContainer();
    if (!container) return;
    container.innerHTML = `
        <div class="col-span-full text-center py-8">
            <p class="text-red-500">No se pudo cargar la vitrina de candidatos. Intenta nuevamente.</p>
        </div>
    `;
}

async function viewCandidate(id) {
    try {
        const response = await DefaultService.getCandidateById(Number(id));
        const candidate = response?.data ?? response;

        if (!candidate) {
            throw new Error('Candidato no encontrado.');
        }

        const skills = Array.isArray(candidate.skills) ? candidate.skills.join(', ') : candidate.skills || 'No disponible';
        const certifications = Array.isArray(candidate.certifications) ? candidate.certifications.join(', ') : candidate.certifications || 'No disponible';

        showSuccess(`Nombre: ${candidate.name || 'Sin nombre'}\nCorreo: ${candidate.email || 'No disponible'}\nProfesión: ${candidate.profession || 'No especificada'}\nEdad: ${candidate.age ? candidate.age + ' años' : 'No especificada'}\nGénero: ${candidate.gender || 'No especificado'}\nComuna: ${candidate.comuna || 'No especificada'}\nHabilidades: ${skills}\nCertificaciones: ${certifications}`);
    } catch (error) {
        console.error('Error obteniendo candidato:', error);
        showError('Error al obtener candidato: ' + (error?.message || 'Revise la consola.'));
    }
}

async function toggleStatus(id) {
    try {
        await DefaultService.toggleCandidateStatus(Number(id), { is_active: true });
        await loadCandidates(state.page);
        showSuccess('Estado actualizado correctamente.');
    } catch (error) {
        console.error('Error actualizando estado:', error);
        showError('Error al cambiar estado: ' + (error?.message || 'Revise la consola.'));
    }
}

function createToast(message, color) {
    const alert = document.createElement('div');
    alert.className = `fixed top-4 right-4 z-50 p-4 rounded shadow-lg text-white ${color}`;
    alert.textContent = message;
    document.body.appendChild(alert);
    setTimeout(() => alert.remove(), 5000);
}

function showError(message) {
    createToast(message, 'bg-red-500');
}

function showSuccess(message) {
    createToast(message, 'bg-green-500');
}

// Inicializar cuando el DOM esté listo
window.addEventListener('DOMContentLoaded', () => {
    loadCandidates();
});

// Exponer funciones globales para los botones HTML
window.viewCandidate = viewCandidate;
window.toggleStatus = toggleStatus;
