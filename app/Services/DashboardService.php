<?php

namespace App\Services;

use App\Traits\CurrentCurrency;
use Carbon\Carbon;

class DashboardService
{
    use CurrentCurrency;

    public function __construct(
        private SalesReportRepositoryInterface $sale,
        private PurchaseReportRepositoryInterface $purchase,
        private ExpensesReportRepositoryInterface $expense
    ) {}

    public function index()
    {
        $currency = $this->getCurrentCurrency();
        $saleTotal = $this->sale->total();
        $purchaseTotal = $this->purchase->total();
        $expenseTotal = $this->expense->total();
        $salesTotal = "{$currency} " . format_number($saleTotal);
        $purchasesTotal = "{$currency} " . format_number($purchaseTotal);
        $expensesTotal = "{$currency} " . format_number($expenseTotal);
        $profitTotal = "{$currency} " . format_number($saleTotal - $purchaseTotal - $expenseTotal);
        $barChart = $this->barChartContent();
        $pieChart = $this->pieChartContent();
        return compact('salesTotal', 'purchasesTotal', 'expensesTotal', 'profitTotal', 'barChart', 'pieChart');
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
                'expenses' => isset($expenses[$date]) ? $expenses[$date]->total_expenses : 0
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
