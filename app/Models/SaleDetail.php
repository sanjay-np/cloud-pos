<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class SaleDetail extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'sale_id',
        'product_id',
        'qty',
        'price',
        'sub_total',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
