<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = Category::all();
        
        $products = Product::factory()
        ->count(150)
        ->create();
        
        foreach([0, 1, 2, 3, 4] as $index => $stock){
            $products[$index]->update([
                'stock'=>$stock,
            ]);
        }
        
        $products[5]->update([
            'is_active'=>false,
        ]);
    }
}
