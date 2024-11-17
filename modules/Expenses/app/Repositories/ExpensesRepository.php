<?php

namespace Modules\Expenses\Repositories;

use App\Interfaces\CrudRepositoryInterface;
use Modules\Expenses\Models\Expense;

class ExpensesRepository implements CrudRepositoryInterface
{
    protected $model;

    public function __construct(Expense $model)
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
        try {
            $this->model->create($data);
            return [
                'success' => true,
                'message' => 'Expense created successfully'
            ];
        } catch (\Exception $e) {
            return [
                'success' => false,
                'message' => $e->getMessage()
            ];
        }
    }

    public function findorFail($id)
    {
        return $this->model->findOrFail($id);
    }

    public function update(array $data, int  $id)
    {
        try {
            $this->model->findOrFail($id)->update($data);
            return [
                'success' => true,
                'message' => 'Expense updated successfully'
            ];
        } catch (\Exception $e) {
            return [
                'success' => false,
                'message' => $e->getMessage()
            ];
        }
    }

    public function delete(int $id)
    {
        try {
            $this->model->findOrFail($id)->delete();
            return [
                'success' => true,
                'message' => 'Expense deleted successfully'
            ];
        } catch (\Exception $e) {
            return [
                'success' => false,
                'message' => $e->getMessage()
            ];
        }
    }
}
