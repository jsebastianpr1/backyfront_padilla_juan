<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Líneas de idioma de validación
    |--------------------------------------------------------------------------
    |
    | Las siguientes líneas contienen los mensajes de error predeterminados
    | utilizados por la clase validadora.
    |
    */

    'required' => 'El campo :attribute es obligatorio.',
    'email' => 'El campo :attribute debe ser una dirección de correo electrónico válida.',
    'unique' => 'El :attribute ingresado ya ha sido registrado por otro postulante.',
    'integer' => 'El campo :attribute debe ser un número entero.',
    'boolean' => 'El campo :attribute debe ser verdadero o falso.',
    'array' => 'El campo :attribute debe ser un listado (arreglo).',
    'in' => 'El valor seleccionado para el campo :attribute es inválido.',
    'required_with' => 'El campo :attribute es obligatorio cuando se especifican :values.',
    
    'max' => [
        'numeric' => 'El campo :attribute no debe ser mayor a :max.',
        'file' => 'El archivo :attribute no debe pesar más de :max kilobytes.',
        'string' => 'El campo :attribute no debe tener más de :max caracteres.',
        'array' => 'El listado :attribute no debe contener más de :max elementos.',
    ],
    
    'min' => [
        'numeric' => 'El campo :attribute debe ser al menos :min.',
        'file' => 'El archivo :attribute debe pesar al menos :min kilobytes.',
        'string' => 'El campo :attribute debe tener al menos :min caracteres.',
        'array' => 'El listado :attribute debe contener al menos :min elementos.',
    ],

    /*
    |--------------------------------------------------------------------------
    | Atributos de Validación Personalizados
    |--------------------------------------------------------------------------
    |
    | Los siguientes nombres de atributos reemplazan las claves del JSON
    | en los mensajes de validación por términos legibles en español.
    |
    */

    'attributes' => [
        'name' => 'nombre',
        'email' => 'correo electrónico',
        'age' => 'edad',
        'gender' => 'género',
        'comuna' => 'comuna de residencia',
        'profession' => 'profesión / cargo',
        'skills' => 'competencias profesionales',
        'skills.*' => 'competencia técnica',
        'certifications' => 'certificaciones',
        'certifications.*' => 'certificación académica',
        'references' => 'referencias laborales',
        'references.*.name' => 'nombre de la referencia',
        'references.*.phone' => 'teléfono de la referencia',
        'references.*.email' => 'correo de la referencia',
        'references.*.relation' => 'relación laboral de la referencia',
        'is_active' => 'visibilidad del perfil',
    ],

];
