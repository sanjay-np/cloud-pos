<?php

namespace Modules\Sales\Repositories;

use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Modules\Sales\Interfaces\SalesReportRepositoryInterface;
use Modules\Sales\Models\Sale;

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
        return $this->model->where('created_at', '>=', $last7Days)
            ->select(DB::raw('DATE(created_at) as date'), DB::raw('SUM(total_amount) as total_sales'))
            ->groupBy(DB::raw('DATE(created_at)'))
            ->get()
            ->keyBy('date');
    }

    public function weeklyTotal()
    {
        return $this->model
            ->whereBetween('created_at', [
                Carbon::now()->startOfWeek(),
                Carbon::now()->endOfWeek()
            ])->sum('total_amount');
    }

    public function monthlyTotal()
    {
        return $this->model
            ->whereMonth('created_at', Carbon::now()->month)
            ->whereYear('created_at', Carbon::now()->year)
            ->sum('total_amount');
    }
}
