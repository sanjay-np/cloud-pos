<?php

namespace Modules\Employee\Repositories;

use App\Interfaces\Interfaces\CurdRepositoryInterface;
use Modules\Employee\Models\Employee;

class EmployeeRepository implements CurdRepositoryInterface
{
    protected $model;

    public function __construct(Employee $model)
    {
        $this->model = $model;
    }

    public function paginate(int $perPage)
    {
        return $this->model->paginate($perPage);
    }

    public function findAll()
    {
        return $this->model->all();
    }

    public function store(array $data)
    {
        return $this->model->create($data);
    }

    public function findorFail($id)
    {
        return $this->model->findOrFail($id);
    }

    public function update(array $data, int  $id)
    {
        return $this->model->find($id)->update($data);
    }

    public function delete(int $id)
    {
        return $this->model->find($id)->delete();
    }

    public function take(int $count)
    {
        return $this->model->take($count)->get();
    }

    public function search(string $search_qry)
    {
        return $this->model->where('name', 'like', '%' . $search_qry . '%')->get();
    }
}
