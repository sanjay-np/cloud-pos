<?php

namespace App\Traits;

use Carbon\Carbon;

trait FilterableByDates
{
    public function scopeToday($query, $column = 'created_at')
    {
        return $query->whereDate($column, Carbon::today());
    }


    public function scopeYesterday($query, $column = 'created_at')
    {
        return $query->whereDate($column, Carbon::yesterday());
    }


    public function scopeMonthToDate($query, $column = 'created_at')
    {
        return $query->whereBetween($column, [Carbon::now()->startOfMonth(), Carbon::now()]);
    }


    public function scopeQuarterToDate($query, $column = 'created_at')
    {
        $now = Carbon::now();
        return $query->whereBetween($column, [$now->startOfQuarter(), $now]);
    }


    public function scopeYearToDate($query, $column = 'created_at')
    {
        return $query->whereBetween($column, [Carbon::now()->startOfYear(), Carbon::now()]);
    }


    public function scopeLast7Days($query, $column = 'created_at')
    {
        return $query->whereBetween($column, [Carbon::today()->subDays(6), Carbon::now()]);
    }


    public function scopeLast30Days($query, $column = 'created_at')
    {
        return $query->whereBetween($column, [Carbon::today()->subDays(29), Carbon::now()]);
    }


    public function scopeLastQuarter($query, $column = 'created_at')
    {
        $now = Carbon::now();
        return $query->whereBetween($column, [$now->startOfQuarter()->subMonths(3), $now->startOfQuarter()]);
    }


    public function scopeLastYear($query, $column = 'created_at')
    {
        return $query->whereBetween($column, [Carbon::now()->subYear(), Carbon::now()]);
    }
}
