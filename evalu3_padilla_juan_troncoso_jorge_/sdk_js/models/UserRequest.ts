/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserReference } from './UserReference';
export type UserRequest = {
    /**
     * Nombre completo del postulante (Dato sensible demográfico).
     */
    name: string;
    /**
     * Dirección de correo (Dato sensible demográfico).
     */
    email: string;
    /**
     * Edad del candidato (Dato sensible demográfico).
     */
    age?: number;
    /**
     * Identidad de género del candidato (Dato sensible demográfico).
     */
    gender?: UserRequest.gender;
    /**
     * Comuna de residencia (Dato sensible demográfico).
     */
    comuna?: string;
    /**
     * Cargo, oficio o profesión del candidato. (Público).
     */
    profession: string;
    /**
     * Colección de competencias técnicas y blandas del candidato. (Público).
     */
    skills?: Array<string>;
    /**
     * Certificaciones y títulos relevantes. (Público).
     */
    certifications?: Array<string>;
    /**
     * Listado de referencias laborales y de contacto directo. (Público).
     */
    references?: Array<UserReference>;
    /**
     * Define la visibilidad inicial del perfil.
     */
    is_active?: boolean;
};
export namespace UserRequest {
    /**
     * Identidad de género del candidato (Dato sensible demográfico).
     */
    export enum gender {
        MASCULINO = 'Masculino',
        FEMENINO = 'Femenino',
        OTRO = 'Otro',
        PREFIERO_NO_DECIRLO = 'Prefiero no decirlo',
    }
}

