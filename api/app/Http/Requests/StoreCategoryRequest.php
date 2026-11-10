<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;

class StoreCategoryRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }
    
    protected function prepareForValidation(): void
    {
        $name = $this->input('name');

        if (is_string($name)) {
            $this->merge([
                'slug' => Str::slug($name),
            ]);
        }
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name'=>'required|string|max:100|unique:categories,name',
            'slug' => 'required|string|unique:categories,slug',
        ];
    }
    
    public function messages(): array
    {
        return [
            'name.required' => 'De categorienaam is verplicht.',
            'name.string' => 'De categorienaam moet tekst zijn.',
            'name.max' => 'De categorienaam mag maximaal 100 tekens bevatten.',
            'name.unique' => 'Deze categorienaam bestaat al.',
            'slug.unique' => 'Deze categorienaam bestaat al.',
        ];
    }
}
