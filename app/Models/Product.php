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
        'category_ids',
        'brand_id',
        'supplier_id',
        'tags',
        'product_type',
        'status',
    ];

    protected $casts = [
        'gallery_images' => 'array',
        'category_ids' => 'array',
        'tags' => 'array',
    ];
}
