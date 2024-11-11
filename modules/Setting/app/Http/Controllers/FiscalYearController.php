<?php

namespace Modules\Setting\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Modules\Setting\Http\Requests\FiscalYear\StoreRequest;
use Modules\Setting\Http\Requests\FiscalYear\UpdateRequest;
use Modules\Setting\Repositories\FiscalYearRepository;

class FiscalYearController extends Controller
{
    protected $fiscalYearRepository;

    public function __construct(FiscalYearRepository $fiscalYearRepository)
    {
        $this->fiscalYearRepository = $fiscalYearRepository;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $fiscalYears = $this->fiscalYearRepository->paginate(perPage: 10);
        return Inertia::render('Setting::FiscalYear', [
            'fiscalYears' => $fiscalYears
        ]);
    }

    public function store(StoreRequest $request)
    {
        $item = $this->fiscalYearRepository->store($request->getValidated());
        if ($item) {
            return to_route('fiscal-years.index');
        }
    }

    public function show($id)
    {
        return $this->fiscalYearRepository->findOrFail($id);
    }

    public function update(UpdateRequest $request, $id)
    {
        $item = $this->fiscalYearRepository->update($request->getValidated(), $id);
        if ($item) {
            return to_route('fiscal-years.index');
        }
    }

    public function destroy($id)
    {
        $item = $this->fiscalYearRepository->delete($id);
        if ($item) {
            return to_route('fiscal-years.index');
        }
    }
}
