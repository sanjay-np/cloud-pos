<?php

namespace App\Http\Controllers;

use App\Contracts\Employee\EmployeeServiceInterface;
use App\Http\Requests\EmployeeRequest;
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
    public function store(EmployeeRequest $request)
    {
        $this->employeeService->store($request->validated());
        return to_route('employees.index');
    }
    public function find($id)
    {
        $employee = $this->employeeService->find($id);
        return $employee;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(EmployeeRequest $request, $id)
    {
        $employee = $this->employeeService->update($request->validated(), $id);
        return to_route('employees.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $employee = $this->employeeService->delete($id);
        return to_route('employees.index');
    }
}
