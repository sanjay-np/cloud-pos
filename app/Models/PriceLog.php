<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PriceLog extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'product_id',
        'price',
        'causer_id',
        'causer_type',
    ];
}
