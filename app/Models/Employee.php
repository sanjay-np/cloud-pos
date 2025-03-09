<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Employee extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'name',
        'phone',
        'department',
        'position',
        'document_type',
        'document_number',
        'avatar',
        'document_files',
        'status'
    ];

    protected $appends = [
        'avatar_url',
        'document_list',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
        'deleted_at',
    ];
    protected $casts = [
        'document_files' => 'array',
    ];

    public function getAvatarUrlAttribute()
    {
        if ($this->avatar) {
            return asset($this->avatar);
        }
        return null;
    }

    public function getDocumentListAttribute()
    {
        if (isset($this->document_files) && is_array($this->document_files)) {
            return array_map(function ($file, $index) {
                return [
                    'name' => basename($file),
                    'fileKey' => $index + 1,
                    'url' => asset($file)
                ];
            }, $this->document_files, array_keys($this->document_files));
        }
        return [];
    }

    public static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            $number = Employee::max('id') + 1;
            $model->code = make_reference_id('EMP', $number);
        });
    }
}
