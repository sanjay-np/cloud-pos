<?php

namespace Modules\Purchase\Models;

use App\Traits\CurrentFiscalYear;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Modules\Product\Models\Supplier;
// use Modules\Purchase\Database\Factories\PurchaseFactory;

class Purchase extends Model
{
    use HasFactory, SoftDeletes, CurrentFiscalYear;

    /**
     * The attributes that are mass assignable.
     */
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
            $model->fiscal_year_id = $model->getCurrentFY();
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
        return $query->where('fiscal_year_id', $this->getCurrentFY());
    }

    // protected static function newFactory(): PurchaseFactory
    // {
    //     // return PurchaseFactory::new();
    // }
}
