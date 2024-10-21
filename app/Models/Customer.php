<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Customer extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'code',
        'phone',
        'whatsapp',
        'address',
        'avatar',
        'status'
    ];

    public static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            $number = Customer::max('id') + 1;
            $model->code = make_reference_id('CUS', $number);
        });
    }
}
