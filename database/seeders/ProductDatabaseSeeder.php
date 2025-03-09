<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class ProductDatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Brand::factory()->count(20)->create();
        Supplier::factory()->count(20)->create();
        Product::factory()->count(20)->create();
    }
}
