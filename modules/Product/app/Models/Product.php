<?php

namespace Modules\Product\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

use Modules\Product\Database\Factories\ProductFactory;

class Product extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'title',
        'sku',
        'bar_code',
        'description',
        'main_image',
        'gallery_images',
        'unit_price',
        'sale_price',
        'stock_qty',
        'category_ids',
        'brand_id',
        'supplier_id',
        'tags',
        'product_type',
        'unit',
        'status',
    ];

    protected $casts = [
        'gallery_images' => 'array',
        'category_ids' => 'array',
        'tags' => 'array',
    ];

    public static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            $number = Product::max('id') + 1;
            $model->sku = make_reference_id('PROD', $number);
        });
    }

    protected static function newFactory(): ProductFactory
    {
        return ProductFactory::new();
    }
}
