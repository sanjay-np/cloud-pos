<?php

namespace App\Services;

use App\Models\Customer;

class DashboardService
{
    public function __construct() {}

    public function getDashboardItems()
    {
        return [
            'stats' => $this->getDashboardStat()
        ];
    }


    private function getDashboardStat()
    {
        return [
            'activeCustomers' => Customer::query()
                ->where('status', 'active')
                ->count(),
        ];
    }
}
