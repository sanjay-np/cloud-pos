<?php

namespace Modules\Sales\Models;

use App\Traits\CurrentCurrency;
use App\Traits\CurrentFiscalYear;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Modules\Customer\Models\Customer;

// use Modules\Sales\Database\Factories\SaleFactory;

class Sale extends Model
{
    use HasFactory, SoftDeletes, CurrentFiscalYear, CurrentCurrency;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'date',
        'reference',
        'customer_id',
        'fiscal_year_id',
        'tax_percentage',
        'tax_amount',
        'discount_amount',
        'shipping_amount',
        'total_amount',
        'paid_amount',
        'due_amount',
        'status',
        'payment_status',
        'payment_method',
        'note',
    ];

    public function getTotalAmountAttribute($value)
    {
        return "{$this->getCurrentCurrency()} " . format_number($value, 2);
    }

    public static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            $number = Sale::max('id') + 1;
            $model->reference = make_reference_id('SALE', $number);
            $model->fiscal_year_id = $model->getCurrentFY();
        });
    }

    public function details()
    {
        return $this->hasMany(SaleDetail::class);
    }

    public function payments()
    {
        return $this->hasMany(SalePayment::class);
    }

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    // protected static function newFactory(): SaleFactory
    // {
    //     // return SaleFactory::new();
    // }
}
