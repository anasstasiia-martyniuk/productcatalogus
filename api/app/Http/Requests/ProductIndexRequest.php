<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProductIndexRequest extends FormRequest
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
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'search'=>'nullable|string',
            'category'=>'nullable|string|exists:categories,slug',
            'min_price'=>'nullable|integer|min:0|max:10000000',
            'max_price'=>'nullable|integer|min:0|max:10000000|after_or_equal:min_price',
            'in_stock'=>'nullable|in:1',
            'is_active'=>'nullable|in:0,1',
            'sort'=>'nullable|in:name,price_cents,stock,created_at',
            'direction'=>'nullable|in:asc,desc',
            'page'=>'nullable|integer|min:1',
            'per_page'=>'nullable|integer|min:1|max:100'
        ];
    }
    
    public function messages(): array
    {
        return [
            'search.string' => 'De zoekterm moet tekst zijn.',
            'category.exists' => 'De geselecteerde categorie bestaat niet.',
            
            'min_price.integer' => 'De minimumprijs moet een geheel getal zijn.',
            'min_price.min' => 'De minimumprijs mag niet lager zijn dan 0.',
            'min_price.max' => 'De minimumprijs mag niet hoger zijn dan €100.000.',
            
            'max_price.integer' => 'De maximumprijs moet een geheel getal zijn.',
            'max_price.min' => 'De maximumprijs mag niet lager zijn dan 0.',
            'max_price.max' => 'De maximumprijs mag niet hoger zijn dan €100.000.',
            'max_price.after_or_equal' => 'De maximumprijs moet groter dan of gelijk aan de minimumprijs zijn.',
            
            'in_stock.in' => 'De voorraadfilter moet 1 zijn.',
            'is_active.in' => 'De actieve status moet 0 of 1 zijn.',
            'sort.in' => 'Het geselecteerde sorteerveld is ongeldig.',
            'direction.in' => 'De sorteerrichting moet asc of desc zijn.',
            
            'page.integer' => 'Het paginanummer moet een geheel getal zijn.',
            'page.min' => 'Het paginanummer moet minimaal 1 zijn.',
            'per_page.integer' => 'Het aantal resultaten moet een geheel getal zijn.',
            'per_page.min' => 'Het aantal resultaten moet minimaal 1 zijn.',
            'per_page.max' => 'Er mogen maximaal 100 resultaten per pagina worden opgevraagd.',
        ];
    }
}
