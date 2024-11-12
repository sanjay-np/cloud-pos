<?php

namespace Modules\Customer\Repositories;

use App\Interfaces\CrudRepositoryInterface;
use App\Interfaces\SearchRepositoryInterface;
use Modules\Customer\Models\Customer;

class CustomerRepository implements CrudRepositoryInterface, SearchRepositoryInterface
{
    protected $model;

    public function __construct(Customer $model)
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

    public function findOrFail($id)
    {
        return $this->model->findOrFail($id);
    }

    public function update(array $data, int $id)
    {
        return $this->model->find($id)->update($data);
    }

    public function delete($id)
    {
        return $this->model->find($id)->delete();
    }

    public function take(int $count)
    {
        return $this->model->take($count)->get();
    }

    public function search(string $search_qry)
    {
        return $this->model
            ->where('name', 'like', '%' . $search_qry . '%')
            ->orWhere('code', 'like', '%' . $search_qry . '%')
            ->orWhere('phone', 'like', '%' . $search_qry . '%')
            ->take(10)
            ->get();
    }
}
