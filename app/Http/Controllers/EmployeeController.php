<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EmployeeController extends Controller
{
    public function __construct(private Employee $model) {}

    public function index(Request $request)
    {
        $employees = $this->model->orderBy('id', 'desc')->paginate(perPage: 10);
        return Inertia::render('Employee::Index', [
            'employees' => $employees
        ]);
    }

    public function store(StoreRequest $request)
    {
        $item = $this->model->create($request->getRequested());
        if ($item) {
            return to_route('employees.index');
        }
    }

    public function show($id)
    {
        return $this->model->findorFail($id);
    }

    public function update(UpdateRequest $request, $id)
    {
        // Todo: update avatar and document if deleted
        $item = $this->model->findorFail($id)->update($request->getRequested());
        if ($item) {
            return to_route('employees.index');
        }
    }

    public function destroy($id)
    {
        $item = $this->model->findorFail($id)->delete();
        if ($item) {
            return to_route('employees.index');
        }
    }
}
