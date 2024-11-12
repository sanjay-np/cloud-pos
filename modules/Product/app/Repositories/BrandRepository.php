<?php

namespace Modules\Product\Repositories;

use App\Interfaces\CrudRepositoryInterface;
use App\Interfaces\SearchRepositoryInterface;
use Modules\Product\Models\Brand;

class BrandRepository implements CrudRepositoryInterface, SearchRepositoryInterface
{
    protected $model;

    public function __construct(Brand $model)
    {
        $this->model = $model;
    }

    public function paginate(int $perPage)
    {
        return $this->model->paginate($perPage)->withQueryString();
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
        return $this->model->findorFail($id);
    }

    public function update(array $data, $id)
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
        return $this->model->where('name', 'like', '%' . $search_qry . '%')->get();
    }
}
