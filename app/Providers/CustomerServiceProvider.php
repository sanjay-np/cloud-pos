<?php

namespace App\Providers;

use App\Contracts\Customer\CustomerRepositoryInterface;
use App\Contracts\Customer\CustomerServiceInterface;
use App\Repositories\CustomerRepository;
use App\Services\CustomerService;
use Illuminate\Support\ServiceProvider;

class CustomerServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(abstract: CustomerRepositoryInterface::class, concrete: CustomerRepository::class);
        $this->app->bind(abstract: CustomerServiceInterface::class, concrete: CustomerService::class);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
