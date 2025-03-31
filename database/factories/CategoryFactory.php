<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
 */
class CategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->unique()->domainWord(),
            'description' => fake()->sentence(3),
            'parent_id' => 0,
            'status' => fake()->randomElement(['active', 'inactive']),
            'image' => fake()->randomElement([
                'product-1.png',
                'product-2.png',
                'product-3.png',
                'product-4.png',
                'product-5.png',
                'product-6.png',
                'product-7.png',
                'product-8.png',
            ]),
        ];
    }
}
