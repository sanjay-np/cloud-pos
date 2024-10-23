<?php

namespace App\Http\Controllers;

use App\Contracts\FiscalYear\FiscalYearServiceInterface;
use Inertia\Inertia;

class FiscalYearController extends Controller
{
    protected $fiscalYearService;

    public function __construct(FiscalYearServiceInterface $fiscalYearService)
    {
        $this->fiscalYearService = $fiscalYearService;
    }

    public function index()
    {
        $fiscalYears = $this->fiscalYearService->paginate(10);
        return Inertia::render('FiscalYears/Index', [
            'fiscalYears' => $fiscalYears
        ]);
    }
}
