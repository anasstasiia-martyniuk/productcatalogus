<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
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
            'sku'=>'required|string|max:30|regex:/^[A-Z0-9-]+$/|unique:products,sku',
            'description'=>'nullable|string|max:5000',
            'price_cents'=>'required|integer|min:0|max:10000000',
            'stock'=>'sometimes|integer|min:0|max:100000',
            'is_active'=>'sometimes|boolean'
        ];
    }
    
    public function messages(): array
    {
        return [
            'category_id.required' => 'Een categorie is verplicht.',
            'category_id.integer' => 'De geselecteerde categorie is ongeldig.',
            'category_id.exists' => 'De geselecteerde categorie bestaat niet.',
            
            'name.required' => 'De productnaam is verplicht.',
            'name.string' => 'De productnaam moet tekst zijn.',
            'name.max' => 'De productnaam mag maximaal 150 tekens bevatten.',
            
            'sku.required' => 'De SKU is verplicht.',
            'sku.string' => 'De SKU moet tekst zijn.',
            'sku.max' => 'De SKU mag maximaal 30 tekens bevatten.',
            'sku.regex' => 'De SKU mag alleen hoofdletters, cijfers en koppeltekens bevatten.',
            'sku.unique' => 'Deze SKU is al in gebruik.',
            
            'description.string' => 'De beschrijving moet tekst zijn.',
            'description.max' => 'De beschrijving mag maximaal 5000 tekens bevatten.',
            
            'price_cents.required' => 'De prijs is verplicht.',
            'price_cents.integer' => 'De prijs moet een geheel getal zijn.',
            'price_cents.min' => 'De prijs mag niet lager zijn dan 0.',
            'price_cents.max' => 'De prijs mag niet hoger zijn dan €100.000.',
            
            'stock.integer' => 'De voorraad moet een geheel getal zijn.',
            'stock.min' => 'De voorraad mag niet lager zijn dan 0.',
            'stock.max' => 'De voorraad mag niet hoger zijn dan 100.000.',
            
            'is_active.boolean' => 'De actieve status moet true of false zijn.',
        ];
    }
}
