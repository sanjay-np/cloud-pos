<?php

namespace App\Providers;

use App\Contracts\Employee\EmployeeRepositoryInterface;
use App\Contracts\Employee\EmployeeServiceInterface;
use App\Repositories\EmployeeRepository;
use App\Services\EmployeeService;
use Illuminate\Support\ServiceProvider;

class EmployeeServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(abstract: EmployeeRepositoryInterface::class, concrete: EmployeeRepository::class);
        $this->app->bind(abstract: EmployeeServiceInterface::class, concrete: EmployeeService::class);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
