<?php

namespace App\Models;

use App\Helpers\Helpers;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;

class Customer extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'code',
        'phone',
        'email',
        'whatsapp',
        'address',
        'avatar',
        'status',
        'created_by',
    ];

    protected $appends = [
        'avatar_url'
    ];

    protected $hidden = [
        'avatar',
        'created_by',
        'updated_at',
        'deleted_at',
    ];

    public function getAvatarUrlAttribute()
    {
        if ($this->avatar) {
            return asset($this->avatar);
        }
        return null;
    }

    public static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            $number = Customer::max('id') + 1;
            $model->code = Helpers::makeReferenceId('CUS', $number);
            $model->created_by = Auth::id();
        });
    }
}
