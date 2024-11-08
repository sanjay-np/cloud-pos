<?php

namespace Modules\Employee\Services;

use Modules\Employee\Interfaces\EmployeeRepositoryInterface;
use Modules\Employee\Interfaces\EmployeeServiceInterface;

class EmployeeService implements EmployeeServiceInterface
{
    protected $employeeRepository;

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
        return $this->employeeRepository->store($data);
    }

    public function show($id)
    {
        return $this->employeeRepository->show($id);
        // if (isset($employee->document_files) && is_array($employee->document_files)) {
        //     $file_list = array_map(function ($file, $index) {
        //         return [
        //             'name' => basename($file),
        //             'fileKey' => $index + 1,
        //             'url' => asset($file)
        //         ];
        //     }, $employee->document_files, array_keys($employee->document_files));
        // }
        // $employee->document_list = $file_list ?? [];
        // return $employee;
    }

    public function update(array $data, int $id)
    {
        return $this->employeeRepository->update($data, $id);
    }

    public function destroy(int $id)
    {
        return $this->employeeRepository->destroy($id);
    }

    public function take(int $count)
    {
        return $this->employeeRepository->take($count);
    }

    public function search(string $search_qry)
    {
        return $this->employeeRepository->search($search_qry);
    }
}
