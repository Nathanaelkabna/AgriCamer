<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CategoryRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|min:4',
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'Le nom de la catégorie est requis.',
            'name.string' => 'Le nom de la catégorie doit être une chaîne de caractères.',
            'name.min' => 'Le nom de la catégorie doit contenir au moins 4 caractères.',
        ];
    }
}
