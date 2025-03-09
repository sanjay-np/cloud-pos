<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class BrandFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     */
    protected $model = Brand::class;

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
            "description" => $this->faker->sentence(10)
        ];
    }
}
