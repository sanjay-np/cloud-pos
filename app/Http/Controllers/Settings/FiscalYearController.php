<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FiscalYearController extends Controller
{
    public function __construct(private FiscalYear $model) {}

    public function index(Request $request)
    {
        $fiscalYears = $this->model->orderBy('id', 'desc')->paginate(perPage: 10);
        return Inertia::render('Setting::FiscalYear', [
            'fiscalYears' => $fiscalYears
        ]);
    }

    public function store(StoreRequest $request)
    {
        $item = $this->model->create($request->getRequested());
        if ($item) {
            return to_route('fiscal-years.index');
        }
    }

    public function show($id)
    {
        return $this->model->findOrFail($id);
    }

    public function update(UpdateRequest $request, $id)
    {
        $item = $this->model->findOrFail($id)->update($request->getRequested());
        if ($item) {
            return to_route('fiscal-years.index');
        }
    }

    public function destroy($id)
    {
        $item = $this->model->findOrFail($id)->delete();
        if ($item) {
            return to_route('fiscal-years.index');
        }
    }
}
