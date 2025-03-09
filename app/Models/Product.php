<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

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
        'purchase_sum_qty' => 'integer',
        'sale_sum_qty' => 'integer',
        'stock_qty' => 'integer'
    ];

    public static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            $number = Product::max('id') + 1;
            $model->sku = make_reference_id('PROD', $number);
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
}
