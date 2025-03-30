<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Employee>
 */
class EmployeeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'phone' => fake()->phoneNumber(),
            'address' => fake()->address(),
            'joined_at' => fake()->date(),
            'department' => fake()->randomElement(['IT', "HR"]),
            'position' => fake()->randomElement(['Manager', 'Employee']),
            'document_type' => 'citizenship',
            'document_number' => fake()->randomNumber(),
            'avatar' => $this->faker->image(storage_path('app/public/Employee'), 500, 500, null, false),
            'document_files' => null,
            'status' => fake()->randomElement(['active', 'inactive']),
        ];
    }
}
