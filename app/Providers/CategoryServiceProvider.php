<?php

namespace App\Providers;

use App\Contracts\Category\CategoryRepositoryInterface;
use App\Contracts\Category\CategoryServiceInterface;
use App\Repositories\CategoryRepository;
use App\Services\CategoryService;
use Illuminate\Support\ServiceProvider;

class CategoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(abstract: CategoryRepositoryInterface::class, concrete: CategoryRepository::class);
        $this->app->bind(abstract: CategoryServiceInterface::class, concrete: CategoryService::class);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
