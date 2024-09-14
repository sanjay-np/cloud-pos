<?php

namespace App\Services\Employee;
use App\Contracts\Employee\EmployeeRepositoryInterface;
use App\Contracts\Employee\EmployeeServiceInterface;

class EmployeeService implements EmployeeServiceInterface
{
    protected $employeeRepository;
    /**
     * Create a new class instance.
     */
    public function __construct(EmployeeRepositoryInterface $employeeRepository)
    {
        $this->employeeRepository = $employeeRepository;
    }
}
