<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title',
        'sku',
        'bar_code',
        'description',
        'main_image',
        'gallery_images',
        'price',
        'purchase_price',
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
}
