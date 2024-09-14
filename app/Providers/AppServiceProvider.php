<?php

namespace App\Providers;

use App\Contracts\Product\BrandRepositoryInterface;
use App\Contracts\Product\BrandServiceInterface;
use App\Contracts\Product\SupplierRepositoryInterface;
use App\Contracts\Product\SupplierServiceInterface;
use App\Repositories\Product\BrandRepository;
use App\Repositories\Product\SupplierRepository;
use App\Services\Product\BrandService;
use App\Services\Product\SupplierService;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(abstract: BrandRepositoryInterface::class, concrete: BrandRepository::class);
        $this->app->bind(abstract: BrandServiceInterface::class, concrete: BrandService::class);
        $this->app->bind(abstract: SupplierRepositoryInterface::class, concrete: SupplierRepository::class);
        $this->app->bind(abstract: SupplierServiceInterface::class, concrete: SupplierService::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
