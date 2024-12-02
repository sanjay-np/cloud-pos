<?php

namespace App\Services;

use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Modules\Expenses\Interfaces\ExpensesReportRepositoryInterface;
use Modules\Purchase\Interfaces\PurchaseReportRepositoryInterface;
use Modules\Sales\Interfaces\SalesReportRepositoryInterface;

class DashboardService
{
    public function __construct(
        private SalesReportRepositoryInterface $sale,
        private PurchaseReportRepositoryInterface $purchase,
        private ExpensesReportRepositoryInterface $expense
    ) {}

    public function index()
    {
        $salesTotal =  $this->sale->total();
        $purchasesTotal =  $this->purchase->total();
        $expensesTotal =  $this->expense->total();
        $barChart = $this->barChartContent();
        $pieChart = $this->pieChartContent();
        return compact('salesTotal', 'purchasesTotal', 'expensesTotal', 'barChart', 'pieChart');
    }

    public function barChartContent()
    {
        $sales = $this->sale->lastSevenDaysTotal();
        $purchases = $this->purchase->lastSevenDaysTotal();
        $expenses = $this->expense->lastSevenDaysTotal();

        $result = [];
        for ($i = 6; $i >= 0; $i--) {
            $date = Carbon::today()->subDays($i)->toDateString();
            $result[] = [
                'date' => $date,
                'sales' => isset($sales[$date]) ? $sales[$date]->total_sales : 0,
                'purchases' => isset($purchases[$date]) ? $purchases[$date]->total_purchase : 0,
                'expenses' => isset($expenses[$date]) ? $expenses[$date]->total_expense : 0
            ];
        }
        return $result;
    }

    public function pieChartContent()
    {
        return [
            ['name' => 'sales', 'value' => $this->sale->monthlyTotal()],
            ['name' => 'purchases', 'value' => $this->purchase->monthlyTotal()],
            ['name' => 'expenses', 'value' => $this->expense->monthlyTotal()],
        ];
    }
}
