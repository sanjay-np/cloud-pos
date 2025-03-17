<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Category extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'name',
        'image',
        'description',
        'parent_id',
        'status'
    ];

    protected $appends = [
        'image_url'
    ];

    protected $hidden = [
        'image',
        'created_by',
        'updated_at',
        'deleted_at',
    ];

    public function getImageUrlAttribute()
    {
        return asset($this->image);
    }

    public function parent()
    {
        return $this->belongsTo(Category::class, 'parent_id', 'id')->withTrashed();
    }
}
