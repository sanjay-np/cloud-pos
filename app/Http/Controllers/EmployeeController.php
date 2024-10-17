<?php

namespace App\Http\Controllers;

use App\Contracts\Employee\EmployeeServiceInterface;
use App\Http\Requests\Employee\StoreRequest;
use App\Http\Requests\Employee\UpdateRequest;
use Inertia\Inertia;

class EmployeeController extends Controller
{
    protected $employeeService;

    public function __construct(EmployeeServiceInterface $employeeService)
    {
        $this->employeeService = $employeeService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $employees = $this->employeeService->paginate(10);
        return Inertia::render('Employees/Index', [
            'employees' => $employees
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        $item = $this->employeeService->store($request->validated());
        if ($item) {
            return to_route('employees.index');
        }
    }
    public function find($id)
    {
        return $this->employeeService->find($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, $id)
    {
        $item = $this->employeeService->update($request->validated(), $id);
        if ($item) {
            return to_route('employees.index');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $item = $this->employeeService->delete($id);
        if ($item) {
            return to_route('employees.index');
        }
    }
}
