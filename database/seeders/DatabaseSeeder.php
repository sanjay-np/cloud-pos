<?php

namespace Database\Seeders;

use App\Models\Brand;
use App\Models\Category;
use App\Models\Customer;
use App\Models\Product;
use App\Models\Supplier;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@test.com',
        ]);

        // // Create 10 brands
        // Brand::factory()->count(50)->create();

        // //Create 5 suppliers
        // Supplier::factory()->count(50)->create();

        // // Create 10 Categories
        // Category::factory()->count(50)->create();

        // for ($i = 0; $i < 20; $i++) {
        //     $product = Product::factory()->create();
        // }

        // Customer::factory()->count(30)->create();
    }
}
