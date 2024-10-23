<?php

namespace App\Http\Controllers;

use App\Contracts\FiscalYear\FiscalYearServiceInterface;
use Illuminate\Http\Request;
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

    public function store(Request $request)
    {
        $item = $this->fiscalYearService->store($request->all());
        if ($item) {
            return to_route('fiscal-years.index');
        }
    }

    public function find($id)
    {
        return $this->fiscalYearService->find($id);
    }

    public function update(Request $request, $id)
    {
        $item = $this->fiscalYearService->update($request->all(), $id);
        if ($item) {
            return to_route('fiscal-years.index');
        }
    }

    public function delete($id)
    {
        $item = $this->fiscalYearService->delete($id);
        if ($item) {
            return to_route('fiscal-years.index');
        }
    }
}
