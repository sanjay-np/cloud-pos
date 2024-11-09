<?php

namespace Modules\Setting\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Modules\Setting\Http\Requests\FiscalYear\StoreRequest;
use Modules\Setting\Http\Requests\FiscalYear\UpdateRequest;
use Modules\Setting\Interfaces\FiscalYear\FiscalYearServiceInterface;

class FiscalYearController extends Controller
{
    protected $fiscalYearService;

    public function __construct(FiscalYearServiceInterface $fiscalYearService)
    {
        $this->fiscalYearService = $fiscalYearService;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $fiscalYears = $this->fiscalYearService->paginate(perPage: 10);
        return Inertia::render('Setting::FiscalYear', [
            'fiscalYears' => $fiscalYears
        ]);
    }

    public function store(StoreRequest $request)
    {
        $item = $this->fiscalYearService->store($request->getValidated());
        if ($item) {
            return to_route('fiscal-years.index');
        }
    }

    public function show($id)
    {
        return $this->fiscalYearService->show($id);
    }

    public function update(UpdateRequest $request, $id)
    {
        $item = $this->fiscalYearService->update($request->getValidated(), $id);
        if ($item) {
            return to_route('fiscal-years.index');
        }
    }

    public function destroy($id)
    {
        $item = $this->fiscalYearService->destroy($id);
        if ($item) {
            return to_route('fiscal-years.index');
        }
    }
}
