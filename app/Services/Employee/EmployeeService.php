<?php

namespace App\Services\Employee;

use App\Contracts\Employee\EmployeeRepositoryInterface;
use App\Contracts\Employee\EmployeeServiceInterface;
use App\Traits\ImageUpload;

class EmployeeService implements EmployeeServiceInterface
{
    use ImageUpload;

    protected $employeeRepository;
    /**
     * Create a new class instance.
     */
    public function __construct(EmployeeRepositoryInterface $employeeRepository)
    {
        $this->employeeRepository = $employeeRepository;
    }

    public function paginate(int $perPage)
    {
        return $this->employeeRepository->paginate($perPage);
    }

    public function store(array $data)
    {
        $avatar_path = $this->avatarUpload($data);
        $documents_path = $this->uploadDocuments($data);
        $data['avatar'] = $avatar_path;
        $data['document_files'] = $documents_path;
        return $this->employeeRepository->store($data);
    }

    public function find(int $id)
    {
        $employee = $this->employeeRepository->find($id);
        $employee->avatar_url = $employee->avatar ? asset($employee->avatar) : null;
        if (isset($employee->document_files) && is_array($employee->document_files)) {
            $file_list = array_map(function ($file, $index) {
                return [
                    'name' => basename($file),
                    'fileKey' => $index + 1,
                    'url' => asset($file)
                ];
            }, $employee->document_files, array_keys($employee->document_files));
        }
        $employee->document_list = $file_list ?? [];
        $employee->makeHidden(['document_files', 'avatar']);
        return  $employee;
    }

    public function update(array $data, int $id)
    {
        $employee = $this->employeeRepository->find($id);
        $avatar_path = $this->avatarUpload($data);
        $documents_path = $this->uploadDocuments($data);
        $data['avatar'] = $avatar_path ?? $employee->avatar;
        $data['document_files'] = $documents_path ?? $employee->document_files;
        return $this->employeeRepository->update($data, $id);
    }

    public function delete(int $id)
    {
        return $this->employeeRepository->delete($id);
    }

    public function avatarUpload($data)
    {
        $avatar_path = null;
        if (isset($data['avatar'])) {
            $avatar_path = $this->uploadImage($data['avatar']['blobFile'], 'Employees/Avatar');
        }
        return $avatar_path;
    }

    public function uploadDocuments($data)
    {
        $documents_path = null;
        if (isset($data['document_files'])) {
            if (isset($data['document_files']) && !empty($data['document_files'])) {
                foreach ($data['document_files'] as $file) {
                    $documents_path[] = $this->uploadImage($file['blobFile'], 'Employees/Documents');
                }
            }
        }
        return $documents_path;
    }
}
