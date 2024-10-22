<?php

namespace App\Providers;

use App\Contracts\Purchase\PurchaseRepositoryInterface;
use App\Contracts\Purchase\PurchaseServiceInterface;
use App\Contracts\PurchaseReturn\PurchaseReturnRepositoryInterface;
use App\Contracts\PurchaseReturn\PurchaseReturnServiceInterface;
use App\Repositories\PurchaseRepository;
use App\Repositories\PurchaseReturnRepository;
use App\Services\PurchaseReturnService;
use App\Services\PurchaseService;
use Illuminate\Support\ServiceProvider;

class PurchaseServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(abstract: PurchaseRepositoryInterface::class, concrete: PurchaseRepository::class);
        $this->app->bind(abstract: PurchaseServiceInterface::class, concrete: PurchaseService::class);

        $this->app->bind(abstract: PurchaseReturnRepositoryInterface::class, concrete: PurchaseReturnRepository::class);
        $this->app->bind(abstract: PurchaseReturnServiceInterface::class, concrete: PurchaseReturnService::class);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
