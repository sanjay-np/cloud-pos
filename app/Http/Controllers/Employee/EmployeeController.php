<?php

namespace App\Http\Controllers\Employee;

use App\Http\Controllers\Controller;
use App\Http\Requests\Employee\StoreRequest;
use App\Http\Requests\Employee\UpdateRequest;
use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Inertia\Inertia;

class EmployeeController extends Controller
{
    public function __construct(
        private Employee $model
    ) {}


    public function index(Request $request)
    {
        $employees = $this->model->query()
            ->select(['id', 'name', 'phone', 'joined_at', 'department', 'position', 'status', 'avatar'])
            ->applyFilter($request->all())
            ->orderBy('id', 'desc')
            ->paginate(perPage: $request->per_page ?? config('pos.per_page'))
            ->withQueryString();

        return Inertia::render('employee/index', [
            'employees' => Inertia::merge($employees->items()),
            'pagination' => Arr::except($employees->toArray(), ['data', 'links'])
        ]);
    }


    public function store(StoreRequest $request)
    {
        try {
            $this->model->create($request->getRequested());
            return to_route('employees.index');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }


    public function show($id)
    {
        return $this->model->findorFail($id);
    }


    public function update(UpdateRequest $request, $id)
    {
        $item = $this->model->findorFail($id)->update($request->getRequested());
        if ($item) {
            return to_route('employees.index');
        }
    }


    public function destroy($id)
    {
        try {
            $this->model->findorFail($id)->delete();
            return to_route('employees.index');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }
}
