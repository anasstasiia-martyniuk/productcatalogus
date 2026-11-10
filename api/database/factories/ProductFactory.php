<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'category_id' => Category::inRandomOrder()->value('id'),
            'name'=>fake()->words(3, true),
            'sku'=>strtoupper(fake()->unique()->bothify('???-###-???')),
            'description'=>fake()->optional()->paragraph(),
            'price_cents'=>fake()->numberBetween(0, 10000000),
            'stock'=>fake()->numberBetween(0, 100000),
            'is_active'=>fake()->boolean(80),
        ];
    }
}
