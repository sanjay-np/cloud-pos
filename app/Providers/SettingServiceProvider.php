<?php

namespace App\Providers;

use App\Contracts\FiscalYear\FiscalYearRepositoryInterface;
use App\Contracts\FiscalYear\FiscalYearServiceInterface;
use App\Repositories\FiscalYearRepository;
use App\Services\FiscalYearService;
use Illuminate\Support\ServiceProvider;

class SettingServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(abstract: FiscalYearRepositoryInterface::class, concrete: FiscalYearRepository::class);
        $this->app->bind(abstract: FiscalYearServiceInterface::class, concrete: FiscalYearService::class);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
