<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Purchase extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'date',
        'reference',
        'supplier_id',
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

    public static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            $number = Purchase::max('id') + 1;
            $model->reference = make_reference_id('PUR', $number);
        });
    }

    public function supplier()
    {
        return $this->belongsTo(Supplier::class);
    }

    public function items()
    {
        return $this->hasMany(PurchaseDetail::class);
    }
}
