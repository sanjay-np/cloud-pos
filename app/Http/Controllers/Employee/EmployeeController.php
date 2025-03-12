<?php

namespace App\Http\Controllers\Employee;

use App\Http\Controllers\Controller;
use App\Http\Requests\Employee\StoreRequest;
use App\Models\Employee;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EmployeeController extends Controller
{
    public function __construct(
        private Employee $model
    ) {}


    public function index(Request $request)
    {
        $employees = $this->model->query()
            ->select([
                'id',
                'name',
                'phone',
                'department',
                'position',
                'status'
            ])
            ->orderBy('id', 'desc')
            ->simplePaginate(perPage: $request->per_page ?? 10);

        return Inertia::render('employee/index', compact('employees'));
    }


    public function store(StoreRequest $request)
    {
        try {
            $item = $this->model->create($request->getRequested());
            if ($item) {
                return to_route('employees.index');
            }
        } catch (\Exception $e) {
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    // public function show($id)
    // {
    //     return $this->model->findorFail($id);
    // }

    // public function update(UpdateRequest $request, $id)
    // {
    //     // Todo: update avatar and document if deleted
    //     $item = $this->model->findorFail($id)->update($request->getRequested());
    //     if ($item) {
    //         return to_route('employees.index');
    //     }
    // }

    // public function destroy($id)
    // {
    //     $item = $this->model->findorFail($id)->delete();
    //     if ($item) {
    //         return to_route('employees.index');
    //     }
    // }
}
