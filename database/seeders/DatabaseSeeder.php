<?php

namespace Database\Seeders;

use App\Models\Brand;
use App\Models\Customer;
use App\Models\Employee;
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
            'email' => 'test@test.com',
            'name' => 'Test User',
            'password' => bcrypt('password'),
        ]);
        Customer::factory(20)->create();
        Employee::factory(20)->create();
        Brand::factory(20)->create();
        Supplier::factory(20)->create();
    }
}
