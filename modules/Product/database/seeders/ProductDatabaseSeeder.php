<?php

namespace Modules\Product\Database\Seeders;

use Illuminate\Database\Seeder;
use Modules\Product\Models\Brand;
use Modules\Product\Models\Product;
use Modules\Product\Models\Supplier;

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
