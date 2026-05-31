/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserReference } from './UserReference';
/**
 * Representación del Currículum Completo (For Admins and Owners)
 */
export type FullUserResponse = {
    id?: number;
    name?: string;
    email?: string;
    age?: number;
    gender?: string;
    comuna?: string;
    profession?: string;
    skills?: Array<string>;
    certifications?: Array<string>;
    references?: Array<UserReference>;
    is_active?: boolean;
    created_at?: string;
    updated_at?: string;
};

