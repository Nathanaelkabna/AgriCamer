<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
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
            'image' => fake()->imageUrl(),
            'product_name' => fake()->name(),
            'description' => fake()->text(),
            'farmer_id' => fake()->numberBetween(1, 10),
            'price_per_unit' => fake()->numberBetween(2000, 10000)
        ];
    }
}
