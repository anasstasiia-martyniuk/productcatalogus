<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }
    
    public function prepareForValidation(): void
    {
        if(is_string($this->sku)){
            $this->merge([
                'sku'=>strtoupper(trim($this->sku)),
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
            'category_id'=>'required|integer|exists:categories,id',
            'name'=>'required|string|max:150',
            'sku'=>['required','string','max:30','regex:/^[A-Z0-9-]+$/', Rule::unique('products', 'sku')->ignore($this->route('id'))],
            'description'=>'nullable|string|max:5000',
            'price_cents'=>'required|integer|min:0|max:10000000',
            'stock'=>'sometimes|integer|min:0|max:100000',
            'is_active'=>'sometimes|boolean'
        ];
    }
}
