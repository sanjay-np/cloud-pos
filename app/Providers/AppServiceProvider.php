<?php

namespace App\Providers;

use App\Contracts\Employee\EmployeeRepositoryInterface;
use App\Contracts\Employee\EmployeeServiceInterface;
use App\Contracts\Product\AttributeRepositoryInterface;
use App\Contracts\Product\AttributeServiceInterface;
use App\Contracts\Product\BrandRepositoryInterface;
use App\Contracts\Product\BrandServiceInterface;
use App\Contracts\Product\CategoryRepositoryInterface;
use App\Contracts\Product\CategoryServiceInterface;
use App\Contracts\Product\ProductRepositoryInterface;
use App\Contracts\Product\ProductServiceInterface;
use App\Contracts\Product\SupplierRepositoryInterface;
use App\Contracts\Product\SupplierServiceInterface;
use App\Repositories\Employee\EmployeeRepository;
use App\Repositories\Product\AttributeRepository;
use App\Repositories\Product\BrandRepository;
use App\Repositories\Product\CategoryRepository;
use App\Repositories\Product\ProductRepository;
use App\Repositories\Product\SupplierRepository;
use App\Services\Employee\EmployeeService;
use App\Services\Product\AttributeService;
use App\Services\Product\BrandService;
use App\Services\Product\CategoryService;
use App\Services\Product\ProductService;
use App\Services\Product\SupplierService;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {

        $this->app->bind(abstract: AttributeRepositoryInterface::class, concrete: AttributeRepository::class);
        $this->app->bind(abstract: AttributeServiceInterface::class, concrete: AttributeService::class);

        $this->app->bind(abstract: BrandRepositoryInterface::class, concrete: BrandRepository::class);
        $this->app->bind(abstract: BrandServiceInterface::class, concrete: BrandService::class);

        $this->app->bind(abstract: SupplierRepositoryInterface::class, concrete: SupplierRepository::class);
        $this->app->bind(abstract: SupplierServiceInterface::class, concrete: SupplierService::class);

        $this->app->bind(abstract: CategoryRepositoryInterface::class, concrete: CategoryRepository::class);
        $this->app->bind(abstract: CategoryServiceInterface::class, concrete: CategoryService::class);

        $this->app->bind(abstract: EmployeeRepositoryInterface::class, concrete: EmployeeRepository::class);
        $this->app->bind(abstract: EmployeeServiceInterface::class, concrete: EmployeeService::class);

        $this->app->bind(abstract: ProductRepositoryInterface::class, concrete: ProductRepository::class);
        $this->app->bind(abstract: ProductServiceInterface::class, concrete: ProductService::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
