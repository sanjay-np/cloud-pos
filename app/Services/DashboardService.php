<?php

namespace App\Services;

use Modules\Expenses\Models\Expense;
use Modules\Purchase\Models\Purchase;
use Modules\Sales\Models\Sale;

class DashboardService
{
    public function __construct(
        private Purchase $purchase,
        private Sale $sale,
        private Expense $expense
    ) {}

    public function index()
    {
        $sales = ['total' => $this->sale->sum('total_amount')];
        $purchases = ['total' => $this->purchase->sum('total_amount')];
        $expenses = ['total' => $this->expense->sum('amount')];
        return compact('sales', 'purchases', 'expenses');
    }
}
