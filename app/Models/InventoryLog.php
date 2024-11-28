<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class InventoryLog extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'product_id',
        'qty',
        'causer_id',
        'causer_type'
    ];
}
