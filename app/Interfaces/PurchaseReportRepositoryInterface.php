<?php

namespace Modules\Purchase\Interfaces;

interface PurchaseReportRepositoryInterface
{
    public function total();

    public function lastSevenDaysTotal();

    public function weeklyTotal();

    public function monthlyTotal();
}
