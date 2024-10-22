<?php

namespace App\Providers;

use App\Contracts\Sales\SalesRepositoryInterface;
use App\Contracts\Sales\SalesServiceInterface;
use App\Contracts\SalesReturn\SalesReturnRepositoryInterface;
use App\Contracts\SalesReturn\SalesReturnServiceInterface;
use App\Repositories\SalesRepository;
use App\Repositories\SalesReturnRepository;
use App\Services\SalesReturnService;
use App\Services\SalesService;
use Illuminate\Support\ServiceProvider;

class SaleServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(abstract: SalesRepositoryInterface::class, concrete: SalesRepository::class);
        $this->app->bind(abstract: SalesServiceInterface::class, concrete: SalesService::class);

        $this->app->bind(abstract: SalesReturnRepositoryInterface::class, concrete: SalesReturnRepository::class);
        $this->app->bind(abstract: SalesReturnServiceInterface::class, concrete: SalesReturnService::class);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
