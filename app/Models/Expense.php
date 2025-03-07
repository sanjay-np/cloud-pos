<?php

namespace Modules\Expenses\Models;

use App\Traits\CurrentFiscalYear;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

// use Modules\Expenses\Database\Factories\ExpenseFactory;

class Expense extends Model
{
    use HasFactory, SoftDeletes, CurrentFiscalYear;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'date',
        'title',
        'amount',
        'description',
        'fiscal_year_id'
    ];

    public static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            $model->fiscal_year_id = $model->getCurrentFY();
        });
    }

    // protected static function newFactory(): ExpenseFactory
    // {
    //     // return ExpenseFactory::new();
    // }
}
