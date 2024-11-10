<?php

namespace Modules\Purchase\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Modules\Product\Models\Product;

// use Modules\Purchase\Database\Factories\PurchaseDetailFactory;

class PurchaseDetail extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'purchase_id',
        'product_id',
        'qty',
        'unit_price',
        'sale_price',
        'sub_total',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    // protected static function newFactory(): PurchaseDetailFactory
    // {
    //     // return PurchaseDetailFactory::new();
    // }
}
