<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class CustomerFactory extends Factory
{
    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'phone' => fake()->unique()->phoneNumber(),
            'whatsapp' => fake()->unique()->phoneNumber(),
            'email' => fake()->unique()->safeEmail(),
            'address' => fake()->address(),
            'avatar' => fake()->randomElement([
                'avatar-1.png',
                'avatar-2.png',
                'avatar-3.png',
                'avatar-4.png',
                'avatar-5.png',
                'avatar-6.png',
                'avatar-7.png',
                'avatar-8.png',
            ]),
            'status' => fake()->randomElement(['active', 'inactive']),
        ];
    }
}
