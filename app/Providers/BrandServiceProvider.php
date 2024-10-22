<?php

namespace App\Providers;

use App\Contracts\Brand\BrandRepositoryInterface;
use App\Contracts\Brand\BrandServiceInterface;
use App\Repositories\BrandRepository;
use App\Services\BrandService;
use Illuminate\Support\ServiceProvider;

class BrandServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(abstract: BrandRepositoryInterface::class, concrete: BrandRepository::class);
        $this->app->bind(abstract: BrandServiceInterface::class, concrete: BrandService::class);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
