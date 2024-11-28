<?php

namespace App\Services;

use Modules\Customer\Models\Customer;
use Modules\Expenses\Models\Expense;
use Modules\Product\Models\Product;

class DashboardService
{
    public function __construct(
        private Customer $customer,
        private Product $product,
        private Expense $expense
    ) {}

    public function index()
    {
        $customers = [
            'total' => $this->customer->count(),
            'new' => $this->customer->where('created_at', '>=', now()->subDays(7))->count(),
        ];

        $products = [
            'total' => $this->product->count(),
            'new' => $this->product->where('created_at', '>=', now()->subDays(7))->count(),
        ];

        $expenses = [
            'total' => $this->expense->count(),
            'new' => $this->expense->where('created_at', '>=', now()->subDays(7))->count(),
        ];
        return [
            'customers' => $customers,
            'products' => $products
        ];
    }
}
