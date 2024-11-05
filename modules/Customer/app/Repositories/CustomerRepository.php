<?php

namespace Modules\Customer\Repositories;

use Modules\Customer\Interfaces\CustomerRepositoryInterface;
use Modules\Customer\Models\Customer;

class CustomerRepository implements CustomerRepositoryInterface
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

    public function store(array $data)
    {
        return $this->model->create($data);
    }

    public function show($id)
    {
        return $this->model->findOrFail($id);
    }

    public function update(array $data, $id)
    {
        return $this->model->find($id)->update($data);
    }

    public function destroy($id)
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
