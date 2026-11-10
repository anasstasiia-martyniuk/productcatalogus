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
            'nullable'=>'nullable|integer|min:1',
            'per_page'=>'nullable|integer|min:1|max:100'
        ];
    }
}
