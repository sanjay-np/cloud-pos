<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Supplier extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'name',
        'phone',
        'address',
        'pan',
        'contact_person',
        'brands'
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    protected $casts = [
        'brands' => 'array'
    ];

    protected $appends = [
        'brands_items'
    ];

    public function getBrandsItemsAttribute()
    {
        if ($this->brands) {
            return Brand::whereIn('id', $this->brands)->select(['id', 'name'])->get();
        }
    }
}
