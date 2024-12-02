<?php

namespace Modules\Sales\Interfaces;

interface SalesReportRepositoryInterface
{

    public function total();

    public function lastSevenDaysTotal();

    public function weeklyTotal();

    public function monthlyTotal();
}
