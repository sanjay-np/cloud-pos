<?php

namespace Modules\Product\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\Product\Models\Product;

class ProductFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     */
    protected $model = Product::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        $productTypes = [
            'Smartphone',
            'Laptop',
            'Headphones',
            'Camera',
            'Shoes',
            'Watch',
            'Tablet',
            'TV',
            'Printer',
            'Backpack',
            'Perfume',
            'Sunglasses',
            'Jacket'
        ];
        return [
            'title' => $this->faker->randomElement($productTypes) . ' ' . $this->faker->word,
            'bar_code' => $this->faker->ean13(),
            'description' => $this->faker->paragraph(),
            'main_image' => null,
            'gallery_images' => null,
            'unit_price' => $this->faker->randomFloat(2, 500, 800),
            'sale_price' => $this->faker->randomFloat(2,  800, 1000),
            'stock_qty' => $this->faker->randomNumber(4),
            'category_ids' => [
                $this->faker->randomElement([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
                $this->faker->randomElement([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
            ],
            'brand_id' => $this->faker->randomElement([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
            'supplier_id' => $this->faker->randomElement([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
            'tags' => null,
            'product_type' => 'simple',
            'unit' => $this->faker->randomElement(['piece', 'kg']),
            'status' => $this->faker->randomElement(['active', 'inactive']),
        ];
    }
}
