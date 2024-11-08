<?php

namespace Modules\Employee\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Modules\Employee\Http\Requests\StoreRequest;
use Modules\Employee\Http\Requests\UpdateRequest;
use Modules\Employee\Interfaces\EmployeeServiceInterface;

class EmployeeController extends Controller
{
    protected $employeeService;

    public function __construct(EmployeeServiceInterface $employeeService)
    {
        $this->employeeService = $employeeService;
    }

    public function index()
    {
        $employees = $this->employeeService->paginate(perPage: 10);
        return Inertia::render('Employee::Index', [
            'employees' => $employees
        ]);
    }

    public function store(StoreRequest $request)
    {
        $item = $this->employeeService->store($request->getValidated() + [
            'avatar' => $request->getAvatar(),
            'document_files' => $request->getDocuments()
        ]);
        if ($item) {
            return to_route('employees.index');
        }
    }

    public function show($id)
    {
        return $this->employeeService->show($id);
    }

    public function update(UpdateRequest $request, $id)
    {
        // Todo: update avatar and document if deleted
        $item = $this->employeeService->update($request->getValidated(), $id);
        if ($item) {
            return to_route('employees.index');
        }
    }

    public function destroy($id)
    {
        $item = $this->employeeService->destroy($id);
        if ($item) {
            return to_route('employees.index');
        }
    }
}
