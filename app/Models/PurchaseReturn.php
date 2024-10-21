<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PurchaseReturn extends Model
{
    use HasFactory, SoftDeletes;

    public static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            $number = PurchaseReturn::max('id') + 1;
            $model->reference = make_reference_id('PUR-RN', $number);
        });
    }
}
