/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BlindUserResponse } from '../models/BlindUserResponse';
import type { FullUserResponse } from '../models/FullUserResponse';
import type { UserRequest } from '../models/UserRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DefaultService {
    /**
     * Consultar Vitrina de Talentos
     * Recupera el listado de candidatos. Por defecto retorna perfiles ciegos (Blind CV) a los empleadores para evitar discriminaciones.
     * @param skill Filtrar candidatos que posean una competencia técnica específica.
     * @param certification Filtrar candidatos que posean una certificación específica.
     * @param role Rol de quien consulta.
     * - `employer`: (Default) Retorna la versión "Blind CV" (anónima). Filtra candidatos inactivos.
     * - `admin`: Retorna la versión completa con datos demográficos.
     *
     * @param page Número de página a consultar para la paginación.
     * @param perPage Cantidad de perfiles de candidatos a incluir por página (Máximo 100).
     * @returns any Listado obtenido exitosamente. Retorna un listado estructurado según el rol consultado.
     * @throws ApiError
     */
    public static listCandidates(
        skill?: string,
        certification?: string,
        role: 'employer' | 'admin' = 'employer',
        page: number = 1,
        perPage: number = 10,
    ): CancelablePromise<{
        status?: string;
        count?: number;
        data?: Array<(BlindUserResponse | FullUserResponse)>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/usuarios',
            query: {
                'skill': skill,
                'certification': certification,
                'role': role,
                'page': page,
                'per_page': perPage,
            },
            errors: {
                429: `Se han excedido el número de peticiones permitidas (60/minuto).`,
                500: `Excepción de tiempo de ejecución del servidor o fallo de la base de datos SQLite.`,
            },
        });
    }
    /**
     * Registrar nuevo candidato
     * Permite registrar la ficha completa del candidato postulante (demográficos + profesionales).
     * @param requestBody
     * @returns any Ficha de postulación creada con éxito.
     * @throws ApiError
     */
    public static createCandidate(
        requestBody: UserRequest,
    ): CancelablePromise<{
        status?: string;
        message?: string;
        data?: FullUserResponse;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/usuarios',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Error en datos suministrados o violaciones en reglas de validación en español.`,
                429: `Se han excedido el número de peticiones permitidas (60/minuto).`,
                500: `Excepción de tiempo de ejecución del servidor o fallo de la base de datos SQLite.`,
            },
        });
    }
    /**
     * Obtener detalle del perfil
     * Devuelve el perfil del candidato por su ID. La respuesta varía según el rol asignado en la query.
     * @param id ID único del candidato.
     * @param role Rol del solicitante.
     * - `employer`: Retorna currículum ciego. Lanza error 404 si el postulante está inactivo ("apagado").
     * - `admin`: Retorna datos completos.
     *
     * @returns any Candidato localizado.
     * @throws ApiError
     */
    public static getCandidateById(
        id: number,
        role: 'employer' | 'admin' = 'employer',
    ): CancelablePromise<{
        status?: string;
        data?: (BlindUserResponse | FullUserResponse);
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/usuarios/{id}',
            path: {
                'id': id,
            },
            query: {
                'role': role,
            },
            errors: {
                404: `Candidato no registrado o perfil desactivado ("apagado") para la vitrina del empleador.`,
                429: `Se han excedido el número de peticiones permitidas (60/minuto).`,
                500: `Excepción de tiempo de ejecución del servidor o fallo de la base de datos SQLite.`,
            },
        });
    }
    /**
     * Actualizar ficha de candidato
     * Modifica los atributos de un candidato registrado. Revalida las restricciones de correo.
     * @param id
     * @param requestBody
     * @returns any Perfil actualizado correctamente.
     * @throws ApiError
     */
    public static updateCandidate(
        id: number,
        requestBody: UserRequest,
    ): CancelablePromise<{
        status?: string;
        message?: string;
        data?: FullUserResponse;
    }> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/usuarios/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Error en datos suministrados o violaciones en reglas de validación en español.`,
                404: `Candidato no registrado o perfil desactivado ("apagado") para la vitrina del empleador.`,
                429: `Se han excedido el número de peticiones permitidas (60/minuto).`,
                500: `Excepción de tiempo de ejecución del servidor o fallo de la base de datos SQLite.`,
            },
        });
    }
    /**
     * Eliminar candidato
     * Remueve físicamente el registro del postulante e invalida el caché.
     * @param id
     * @returns any Postulación eliminada del sistema.
     * @throws ApiError
     */
    public static deleteCandidate(
        id: number,
    ): CancelablePromise<{
        status?: string;
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/usuarios/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Candidato no registrado o perfil desactivado ("apagado") para la vitrina del empleador.`,
                429: `Se han excedido el número de peticiones permitidas (60/minuto).`,
                500: `Excepción de tiempo de ejecución del servidor o fallo de la base de datos SQLite.`,
            },
        });
    }
    /**
     * Encender o Apagar Perfil ("Toggle Status")
     * Modifica el estado lógico de visibilidad del candidato. Los perfiles inactivos son invisibles en la vitrina de empleadores.
     * @param id ID del candidato a modificar.
     * @param requestBody
     * @returns any Visibilidad del perfil modificada con éxito.
     * @throws ApiError
     */
    public static toggleCandidateStatus(
        id: number,
        requestBody: {
            /**
             * true para activar ("encender") el perfil en la vitrina, false para ocultar ("apagar") el perfil.
             */
            is_active: boolean;
        },
    ): CancelablePromise<{
        status?: string;
        message?: string;
        is_active?: boolean;
    }> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/usuarios/{id}/status',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Error en datos suministrados o violaciones en reglas de validación en español.`,
                404: `Candidato no registrado o perfil desactivado ("apagado") para la vitrina del empleador.`,
                429: `Se han excedido el número de peticiones permitidas (60/minuto).`,
                500: `Excepción de tiempo de ejecución del servidor o fallo de la base de datos SQLite.`,
            },
        });
    }
}
