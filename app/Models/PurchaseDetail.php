<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PurchaseDetail extends Model
{
    use HasFactory;

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
}
