<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class BrandFactory extends Factory
{
    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        $brands = [
            'Apple',
            'Samsung',
            'Nike',
            'Adidas',
            'Sony',
            'Microsoft',
            'Google',
            'Amazon',
            'Tesla',
            'BMW',
            'Coca-Cola',
            'Pepsi',
            'Toyota',
            'Honda',
            'Ford',
            'Mercedes-Benz',
            'Puma',
            'Under Armour',
            'Asus',
            'Dell',
            'HP',
            'Lenovo',
            'Xiaomi',
            'LG',
            'Nvidia'
        ];
        return [
            "name" => $this->faker->unique()->randomElement($brands),
            "description" => $this->faker->sentence(10),
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
