<?php

namespace App\Providers;

use App\Contracts\Supplier\SupplierRepositoryInterface;
use App\Contracts\Supplier\SupplierServiceInterface;
use App\Repositories\SupplierRepository;
use App\Services\SupplierService;
use Illuminate\Support\ServiceProvider;

class SupplierServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(abstract: SupplierRepositoryInterface::class, concrete: SupplierRepository::class);
        $this->app->bind(abstract: SupplierServiceInterface::class, concrete: SupplierService::class);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
