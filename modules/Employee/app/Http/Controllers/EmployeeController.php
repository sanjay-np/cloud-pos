<?php

namespace Modules\Employee\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Traits\InertiaResponseTrait;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Modules\Employee\Http\Requests\StoreRequest;
use Modules\Employee\Http\Requests\UpdateRequest;
use Modules\Employee\Repositories\EmployeeRepository;

class EmployeeController extends Controller
{
    use InertiaResponseTrait;
    protected $employeeRepository;

    public function __construct(EmployeeRepository $employeeRepository)
    {
        $this->employeeRepository = $employeeRepository;
    }

    public function index(Request $request)
    {
        $employees = $this->employeeRepository->paginate(perPage: 10);
        return Inertia::render('Employee::Index', [
            'employees' => $employees
        ]);
    }

    public function store(StoreRequest $request)
    {
        $item = $this->employeeRepository->store($request->getValidated() + [
            'avatar' => $request->getAvatar(),
            'document_files' => $request->getDocuments()
        ]);
        if ($item) {
            return to_route('employees.index');
        }
    }

    public function show($id)
    {
        return $this->employeeRepository->findorFail($id);
    }

    public function update(UpdateRequest $request, $id)
    {
        // Todo: update avatar and document if deleted
        $item = $this->employeeRepository->update($request->getValidated(), $id);
        if ($item) {
            return to_route('employees.index');
        }
    }

    public function destroy($id)
    {
        $item = $this->employeeRepository->delete($id);
        if ($item) {
            return to_route('employees.index');
        }
    }
}
