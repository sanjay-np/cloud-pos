<?php

namespace App\Models;

use App\Traits\CurrentFiscalYear;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Purchase extends Model
{
    use HasFactory, SoftDeletes, CurrentFiscalYear;

    protected $fillable = [
        'date',
        'reference',
        'supplier_id',
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

    public static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            $number = Purchase::max('id') + 1;
            $model->reference = make_reference_id('PUR', $number);
            $model->fiscal_year_id = $this->getCurrentFY();
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

    public function scopeCurrent($query)
    {
        return $query->where('fiscal_year_id', $this->getCurrentFY())->first();
    }
}
