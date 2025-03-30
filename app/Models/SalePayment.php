<?php

namespace App\Models;

use App\Helpers\Helpers;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class SalePayment extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'sale_id',
        'amount',
        'date',
        'reference',
        'payment_method',
        'note',
    ];


    protected $hidden = [
        'created_at',
        'updated_at',
        'deleted_at',
    ];


    public static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            $number = SalePayment::max('id') + 1;
            $model->reference = Helpers::makeReferenceId('SALE-PAY', $number);
        });
    }
}
