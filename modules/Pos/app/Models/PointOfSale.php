<?php

namespace Modules\Pos\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
// use Modules\Pos\Database\Factories\PointOfSaleFactory;

class PointOfSale extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [];

    // protected static function newFactory(): PointOfSaleFactory
    // {
    //     // return PointOfSaleFactory::new();
    // }
}
