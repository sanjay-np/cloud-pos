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
            'image' => $this->faker->image(storage_path('app/public/Category'), 500, 500, null, false),
        ];
    }
}
