<?php

namespace App\Models;

use App\Helpers\Helpers;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;

class Employee extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'name',
        'code',
        'phone',
        'address',
        'joined_at',
        'department',
        'position',
        'document_type',
        'document_number',
        'avatar',
        'document_files',
        'status',
        'created_by'
    ];


    protected $appends = [
        'avatar_url',
        'document_list',
    ];


    protected $hidden = [
        'avatar',
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
            return asset("storage/Employees/Avatar/{$this->avatar}");
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


    public function scopeApplyFilter($query, array $params)
    {
        $filterParams = collect($params);

        if ($filterParams->has('qry')) {
            $query->where('name', 'LIKE', "%{$filterParams->get('qry')}%");
        }
    }


    public static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            $number = Employee::max('id') + 1;
            $model->code = Helpers::makeReferenceId('EMP', $number);
            $model->created_by = Auth::id();
        });
    }
}
