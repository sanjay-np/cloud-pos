<?php

namespace App\Models;

use App\Builders\ProductBuilder;
use App\Helpers\Helpers;
use App\Traits\AppendsToggle;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use HasFactory, SoftDeletes, AppendsToggle;

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
        'purchase_price',
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


    protected $appends = [
        'image_url'
    ];


    protected $casts = [
        'tags' => 'array',
        'category_ids' => 'array'
    ];

    public function getImageUrlAttribute()
    {
        return asset($this->main_image);
    }


    public static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            $number = Product::max('id') + 1;
            $model->sku = Helpers::makeReferenceId('PROD', $number);
        });
    }


    public function purchase()
    {
        return $this->hasMany(PurchaseDetail::class, 'product_id');
    }


    public function latestPurchase()
    {
        return $this->hasOne(PurchaseDetail::class, 'product_id')->latest('created_at');
    }


    public function sale()
    {
        return $this->hasMany(SaleDetail::class, 'product_id');
    }


    public function newEloquentBuilder($query): ProductBuilder
    {
        return new ProductBuilder($query);
    }
}
