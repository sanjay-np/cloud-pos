<?php

namespace Modules\Purchase\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
// use Modules\Purchase\Database\Factories\PurchasePaymentFactory;

class PurchasePayment extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'purchase_id',
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
            $number = PurchasePayment::max('id') + 1;
            $model->reference = make_reference_id('PUR-PAY', $number);
        });
    }


    // protected static function newFactory(): PurchasePaymentFactory
    // {
    //     // return PurchasePaymentFactory::new();
    // }
}
