<?php

namespace Modules\Product\Providers;

use Illuminate\Support\Facades\Blade;
use Illuminate\Support\ServiceProvider;
use Modules\Product\Interfaces\Attribute\AttributeRepositoryInterface;
use Modules\Product\Interfaces\Attribute\AttributeServiceInterface;
use Modules\Product\Interfaces\Brand\BrandRepositoryInterface;
use Modules\Product\Interfaces\Brand\BrandServiceInterface;
use Modules\Product\Interfaces\Category\CategoryRepositoryInterface;
use Modules\Product\Interfaces\Category\CategoryServiceInterface;
use Modules\Product\Interfaces\Product\ProductRepositoryInterface;
use Modules\Product\Interfaces\Product\ProductServiceInterface;
use Modules\Product\Interfaces\Supplier\SupplierRepositoryInterface;
use Modules\Product\Interfaces\Supplier\SupplierServiceInterface;
use Modules\Product\Repositories\AttributeRepository;
use Modules\Product\Repositories\BrandRepository;
use Modules\Product\Repositories\CategoryRepository;
use Modules\Product\Repositories\ProductRepository;
use Modules\Product\Repositories\SupplierRepository;
use Modules\Product\Services\AttributeService;
use Modules\Product\Services\BrandService;
use Modules\Product\Services\CategoryService;
use Modules\Product\Services\ProductService;
use Modules\Product\Services\SupplierService;
use Nwidart\Modules\Traits\PathNamespace;

class ProductServiceProvider extends ServiceProvider
{
    use PathNamespace;

    protected string $name = 'Product';

    protected string $nameLower = 'product';

    /**
     * Boot the application events.
     */
    public function boot(): void
    {
        $this->registerCommands();
        $this->registerCommandSchedules();
        $this->registerTranslations();
        $this->registerConfig();
        $this->registerViews();
        $this->loadMigrationsFrom(module_path($this->name, 'database/migrations'));
    }

    /**
     * Register the service provider.
     */
    public function register(): void
    {
        $this->app->register(EventServiceProvider::class);
        $this->app->register(RouteServiceProvider::class);

        $this->app->bind(abstract: AttributeRepositoryInterface::class, concrete: AttributeRepository::class);
        $this->app->bind(abstract: AttributeServiceInterface::class, concrete: AttributeService::class);

        $this->app->bind(abstract: BrandRepositoryInterface::class, concrete: BrandRepository::class);
        $this->app->bind(abstract: BrandServiceInterface::class, concrete: BrandService::class);

        $this->app->bind(abstract: CategoryRepositoryInterface::class, concrete: CategoryRepository::class);
        $this->app->bind(abstract: CategoryServiceInterface::class, concrete: CategoryService::class);

        $this->app->bind(abstract: ProductRepositoryInterface::class, concrete: ProductRepository::class);
        $this->app->bind(abstract: ProductServiceInterface::class, concrete: ProductService::class);

        $this->app->bind(abstract: SupplierRepositoryInterface::class, concrete: SupplierRepository::class);
        $this->app->bind(abstract: SupplierServiceInterface::class, concrete: SupplierService::class);
    }

    /**
     * Register commands in the format of Command::class
     */
    protected function registerCommands(): void
    {
        // $this->commands([]);
    }

    /**
     * Register command Schedules.
     */
    protected function registerCommandSchedules(): void
    {
        // $this->app->booted(function () {
        //     $schedule = $this->app->make(Schedule::class);
        //     $schedule->command('inspire')->hourly();
        // });
    }

    /**
     * Register translations.
     */
    public function registerTranslations(): void
    {
        $langPath = resource_path('lang/modules/' . $this->nameLower);

        if (is_dir($langPath)) {
            $this->loadTranslationsFrom($langPath, $this->nameLower);
            $this->loadJsonTranslationsFrom($langPath);
        } else {
            $this->loadTranslationsFrom(module_path($this->name, 'lang'), $this->nameLower);
            $this->loadJsonTranslationsFrom(module_path($this->name, 'lang'));
        }
    }

    /**
     * Register config.
     */
    protected function registerConfig(): void
    {
        $this->publishes([module_path($this->name, 'config/config.php') => config_path($this->nameLower . '.php')], 'config');
        $this->mergeConfigFrom(module_path($this->name, 'config/config.php'), $this->nameLower);
    }

    /**
     * Register views.
     */
    public function registerViews(): void
    {
        $viewPath = resource_path('views/modules/' . $this->nameLower);
        $sourcePath = module_path($this->name, 'resources/views');

        $this->publishes([$sourcePath => $viewPath], ['views', $this->nameLower . '-module-views']);

        $this->loadViewsFrom(array_merge($this->getPublishableViewPaths(), [$sourcePath]), $this->nameLower);

        $componentNamespace = $this->module_namespace($this->name, $this->app_path(config('modules.paths.generator.component-class.path')));
        Blade::componentNamespace($componentNamespace, $this->nameLower);
    }

    /**
     * Get the services provided by the provider.
     */
    public function provides(): array
    {
        return [];
    }

    private function getPublishableViewPaths(): array
    {
        $paths = [];
        foreach (config('view.paths') as $path) {
            if (is_dir($path . '/modules/' . $this->nameLower)) {
                $paths[] = $path . '/modules/' . $this->nameLower;
            }
        }

        return $paths;
    }
}
