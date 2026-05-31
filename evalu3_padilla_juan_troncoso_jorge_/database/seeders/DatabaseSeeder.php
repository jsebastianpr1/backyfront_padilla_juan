<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Candidate 1: Alejandra Parraguez (Active)
        User::create([
            'name' => 'Alejandra Parraguez',
            'email' => 'alejandra.parraguez@optica.cl',
            'age' => 34,
            'gender' => 'Femenino',
            'comuna' => 'Providencia',
            'profession' => 'Optometrista Clínico',
            'skills' => [
                'Refracción Avanzada',
                'Adaptación de Lentes de Contacto',
                'Diagnóstico Ocular Primario',
                'Atención al Paciente'
            ],
            'certifications' => [
                'Título Profesional de Optometría - USTChile',
                'Especialista en Lentes de Contacto Progresivos'
            ],
            'references' => [
                [
                    'name' => 'Dr. Carlos Mendoza',
                    'relation' => 'Oftalmólogo Jefe',
                    'phone' => '+56 9 8765 4321',
                    'email' => 'carlos.mendoza@clinicavisual.cl'
                ],
                [
                    'name' => 'Sofía Ibáñez',
                    'relation' => 'Directora de Clínica',
                    'phone' => '+56 9 1234 5678',
                    'email' => 'sofia.ibanez@clinicavisual.cl'
                ]
            ],
            'is_active' => true
        ]);

        // Candidate 2: Juan Padilla (Active)
        User::create([
            'name' => 'Juan Padilla Roa',
            'email' => 'juan.padilla@dev.cl',
            'age' => 27,
            'gender' => 'Masculino',
            'comuna' => 'Providencia',
            'profession' => 'Desarrollador Backend Laravel',
            'skills' => [
                'PHP',
                'Laravel Framework',
                'APIs RESTful',
                'Bases de Datos SQL/SQLite',
                'Git/GitHub',
                'Test-Driven Development (TDD)'
            ],
            'certifications' => [
                'Laravel Certified Developer v11',
                'AWS Certified Cloud Practitioner'
            ],
            'references' => [
                [
                    'name' => 'Ana María Troncoso',
                    'relation' => 'Líder Técnica',
                    'phone' => '+56 9 9876 5432',
                    'email' => 'ana.troncoso@techcorp.cl'
                ]
            ],
            'is_active' => true
        ]);

        // Candidate 3: Jorge Troncoso (Active)
        User::create([
            'name' => 'Jorge Troncoso Navarro',
            'email' => 'jorge.troncoso@dev.cl',
            'age' => 29,
            'gender' => 'Masculino',
            'comuna' => 'Providencia',
            'profession' => 'Desarrollador Frontend Angular',
            'skills' => [
                'TypeScript',
                'Angular 19+',
                'HTML5 / CSS3 (Glassmorphism)',
                'Responsive Design',
                'Accesibilidad WAI-ARIA',
                'Optimización SEO'
            ],
            'certifications' => [
                'Angular Standalone Expert',
                'Google UX Design Professional Certificate'
            ],
            'references' => [
                [
                    'name' => 'Roberto Gómez',
                    'relation' => 'Product Manager',
                    'phone' => '+56 9 7654 3210',
                    'email' => 'roberto.gomez@techcorp.cl'
                ]
            ],
            'is_active' => true
        ]);

        // Candidate 4: Valentina Rojas (Inactive - "Apagado" by default for testing)
        User::create([
            'name' => 'Valentina Rojas Peña',
            'email' => 'valentina.rojas@design.cl',
            'age' => 25,
            'gender' => 'Femenino',
            'comuna' => 'Providencia',
            'profession' => 'Diseñadora UI/UX',
            'skills' => [
                'Figma',
                'Design Systems',
                'Prototipado Interactivo',
                'User Research',
                'UI Glassmorphism'
            ],
            'certifications' => [
                'Google UX Design Professional',
                'Figma Design Advanced Certificate'
            ],
            'references' => [
                [
                    'name' => 'Mauricio Valenzuela',
                    'relation' => 'CTO',
                    'phone' => '+56 9 5555 4444',
                    'email' => 'mvalenzuela@agency.cl'
                ]
            ],
            'is_active' => false // Inactive talent profile
        ]);

        // Candidate 5: Ricardo Soto (Active)
        User::create([
            'name' => 'Ricardo Soto Duarte',
            'email' => 'ricardo.soto@infra.cl',
            'age' => 42,
            'gender' => 'Masculino',
            'comuna' => 'Providencia',
            'profession' => 'Administrador de Sistemas Linux & Cloud',
            'skills' => [
                'Red Hat Enterprise Linux (RHEL)',
                'Docker / Containerization',
                'AWS Cloud Management',
                'Shell/Bash Scripting',
                'CI/CD Pipelines'
            ],
            'certifications' => [
                'Red Hat Certified Engineer (RHCE)',
                'Cisco Certified Network Associate (CCNA)'
            ],
            'references' => [
                [
                    'name' => 'Paula Torres',
                    'relation' => 'Directora de TI',
                    'phone' => '+56 9 6666 7777',
                    'email' => 'paula.torres@infra.cl'
                ]
            ],
            'is_active' => true
        ]);
    }
}
