<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Product extends Model
{
    /** @use HasFactory<\Database\Factories\ProductFactory> */
    use HasFactory;
    
    public $fillable = [
        'category_id',
        'name',
        'sku',
        'description',
        'price_cents',
        'stock',
        'is_active'
    ];
    
    public $casts = [
        'price_cents'=>'integer',
        'stock'=>'integer',
        'is_active'=>'boolean'
    ];
    
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }
}
