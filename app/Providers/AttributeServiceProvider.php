<?php

namespace App\Providers;

use App\Contracts\Attribute\AttributeRepositoryInterface;
use App\Contracts\Attribute\AttributeServiceInterface;
use App\Contracts\AttributeValue\AttributeValueRepositoryInterface;
use App\Contracts\AttributeValue\AttributeValueServiceInterface;
use App\Repositories\AttributeRepository;
use App\Repositories\AttributeValueRepository;
use App\Services\AttributeService;
use App\Services\AttributeValueService;
use Illuminate\Support\ServiceProvider;

class AttributeServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(abstract: AttributeRepositoryInterface::class, concrete: AttributeRepository::class);
        $this->app->bind(abstract: AttributeServiceInterface::class, concrete: AttributeService::class);

        $this->app->bind(abstract: AttributeValueRepositoryInterface::class, concrete: AttributeValueRepository::class);
        $this->app->bind(abstract: AttributeValueServiceInterface::class, concrete: AttributeValueService::class);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
