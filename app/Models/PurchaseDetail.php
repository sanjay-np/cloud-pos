<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

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
}
