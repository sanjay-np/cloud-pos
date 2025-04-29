<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class Option extends Model
{
    protected $fillable = [
        'meta_key',
        'meta_value',
        'meta_category',
    ];


    public function scopeWhereCategory(Builder $query, string $category): Builder
    {
        return $query->where('meta_category', $category);
    }
}
