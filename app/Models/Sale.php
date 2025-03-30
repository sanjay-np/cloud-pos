<?php

namespace App\Models;

use App\Helpers\Helpers;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Sale extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'date',
        'reference',
        'customer_id',
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


    protected $hidden = [
        'created_at',
        'updated_at',
        'deleted_at',
    ];


    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }


    public function details()
    {
        return $this->hasMany(SaleDetail::class);
    }


    public function payments()
    {
        return $this->hasMany(SalePayment::class);
    }


    public static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            $number = Sale::max('id') + 1;
            $model->reference = Helpers::makeReferenceId('SALE', $number);
        });
    }
}
