<?php

namespace App\Interfaces;

interface ExpensesReportRepositoryInterface
{
    public function total();

    public function lastSevenDaysTotal();

    public function weeklyTotal();

    public function monthlyTotal();
}
