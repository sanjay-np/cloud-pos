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
            if (isset($request->document_files) && !empty($request->document_files)) {
                foreach ($request->file('document_files') as $file) {
                    $documents_path[] = $this->uploadImage($file['blobFile'], 'Employees/Documents');
                }
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
    public function get($id)
    {
        $item = Employee::findOrFail($id);
        $item->avatar_url = $item->avatar ? asset($item->avatar) : null;
        if (isset($item->document_files) && is_array($item->document_files)) {
            $file_list = array_map(function ($file, $index) {
                return [
                    'name' => basename($file),
                    'fileKey' => $index + 1,
                    'url' => asset($file)
                ];
            }, $item->document_files, array_keys($item->document_files));
        }
        $item->document_list = $file_list ?? [];
        $item->makeHidden(['document_files', 'avatar']);
        return $item;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
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
            if (isset($request->document_files) && !empty($request->document_files)) {
                foreach ($request->file('document_files') as $file) {
                    $documents_path[] = $this->uploadImage($file['blobFile'], 'Employees/Documents');
                }
            }
        }
        $employee = Employee::findOrFail($id);
        $employee->update([
            'name' => $request->name,
            'phone' => $request->phone,
            'department' => $request->department,
            'position' => $request->position,
            'document_type' => $request->document_type,
            'document_number' => $request->document_number,
            'avatar' => $avatar_path ?? $employee->avatar,
            'document_files' => $documents_path ?? $employee->document_files,
        ]);
        return to_route('employees.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $employee = Employee::findOrFail($id);
        $employee->delete();
        return to_route('employees.index');
    }
}
