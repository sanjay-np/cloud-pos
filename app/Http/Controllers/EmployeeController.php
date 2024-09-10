<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Traits\ImageUpload;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EmployeeController extends Controller
{
    use ImageUpload;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $employees = Employee::paginate(10);
        return Inertia::render('Employees/Index', [
            'employees' => $employees
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:10',
            'department' => 'required',
            'position' => 'required',
            'document_type' => 'required',
            'document_number' => 'required|string|max:255',
        ]);
        $avatar_path = null;
        if ($request->hasFile('avatar')) {
            $avatar_path = $this->uploadImage($request->file('avatar')['blobFile'], 'Employees/Avatar');
        }
        $documents_path = null;
        if ($request->has('document_files')) {
            foreach ($request->file('document_files') as $file) {
                $documents_path[] = $this->uploadImage($file['blobFile'], 'Employees/Documents');
            }
        }
        $employee = Employee::create([
            'name' => $request->name,
            'phone' => $request->phone,
            'department' => $request->department,
            'position' => $request->position,
            'document_type' => $request->document_type,
            'document_number' => $request->document_number,
            'avatar' => $avatar_path,
            'document_files' => $documents_path,
        ]);
        return to_route('employees.index');
    }
    public function get(Employee $employee, $id)
    {
        $item = $employee->findOrFail($id);
        return $item;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Employee $employee)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Employee $employee)
    {
        //
    }
}
