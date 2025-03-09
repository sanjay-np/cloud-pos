<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Inertia\Inertia;


class ExpensesController extends Controller
{
    public function __construct(private Expense $model) {}

    public function index()
    {
        $expenses = $this->model->orderBy('id', 'desc')->paginate(10);
        return Inertia::render('Expenses::Index', [
            'expenses' => $expenses
        ]);
    }

    public function store(StoreRequest $request)
    {
        $item = $this->model->create($request->getRequested());
        if ($item) {
            return to_route('expenses.index');
        }
    }

    public function show(int $id)
    {
        return $this->model->findOrFail($id);
    }

    public function update(UpdateRequest $request, int $id)
    {
        $item = $this->model->findOrFail($id)->update($request->getRequested());
        if ($item) {
            return to_route('expenses.index');
        }
    }

    public function destroy(int $id)
    {
        $item = $this->model->findOrFail($id)->delete();
        if ($item) {
            return to_route('expenses.index');
        }
    }
}
