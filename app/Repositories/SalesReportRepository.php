<?php

namespace App\Repositories;

use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class SalesReportRepository implements SalesReportRepositoryInterface
{
    public function __construct(
        private Sale $model
    ) {}

    public function total()
    {
        return $this->model
            ->sum('total_amount');
    }

    public function lastSevenDaysTotal()
    {
        $last7Days = Carbon::today()->subDays(6)->toDateString();
        return $this->model->where('date', '>=', $last7Days)
            ->select(DB::raw('DATE(date) as date'), DB::raw('SUM(total_amount) as total_sales'))
            ->groupBy(DB::raw('DATE(date)'))
            ->get()
            ->keyBy('date');
    }

    public function weeklyTotal()
    {
        return $this->model
            ->whereBetween('date', [
                Carbon::now()->startOfWeek(),
                Carbon::now()->endOfWeek()
            ])->sum('total_amount');
    }

    public function monthlyTotal()
    {
        return $this->model
            ->whereMonth('date', Carbon::now()->month)
            ->whereYear('date', Carbon::now()->year)
            ->sum('total_amount');
    }
}
