<?php

namespace Modules\Expenses\Repositories;

use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Modules\Expenses\Interfaces\ExpensesReportRepositoryInterface;
use Modules\Expenses\Models\Expense;

class ExpensesReportRepository implements ExpensesReportRepositoryInterface
{
    public function __construct(private Expense $model) {}

    public function total()
    {
        return $this->model->sum('amount');
    }

    public function lastSevenDaysTotal()
    {
        $last7Days = Carbon::today()->subDays(6)->toDateString();
        return $this->model
            ->where('date', '>=', $last7Days)
            ->select(DB::raw('DATE(date) as date'), DB::raw('SUM(amount) as total_expenses'))
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
            ])->sum('amount');
    }

    public function monthlyTotal()
    {
        return $this->model
            ->whereMonth('date', Carbon::now()->month)
            ->whereYear('date', Carbon::now()->year)
            ->sum('amount');
    }
}
