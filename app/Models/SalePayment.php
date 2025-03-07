<?php

namespace Modules\Sales\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
// use Modules\Sales\Database\Factories\SalePaymentFactory;

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

    public static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            $number = SalePayment::max('id') + 1;
            $model->reference = make_reference_id('SALE-PAY', $number);
        });
    }

    // protected static function newFactory(): SalePaymentFactory
    // {
    //     // return SalePaymentFactory::new();
    // }
}
