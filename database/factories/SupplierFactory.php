<?php

namespace Database\Factories;

use App\Models\Brand;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Supplier>
 */
class SupplierFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $brandIds = Brand::all()->pluck('id')->toArray();
        $selectedBrandIds = $this->faker->randomElements($brandIds, 3);

        return [
            'name' => fake()->unique()->name(),
            'phone' => fake()->unique()->phoneNumber(),
            'address' => fake()->address(),
            'pan' => fake()->unique()->randomNumber(8),
            'contact_person' => fake()->unique()->name(),
            'brands' => $selectedBrandIds,
        ];
    }
}
