<?php

namespace App\Http\Controllers\Expenses;

use App\Http\Controllers\Controller;
use App\Http\Requests\Expenses\StoreRequest;
use App\Http\Requests\Expenses\UpdateRequest;
use App\Models\Expense;
use Illuminate\Support\Arr;
use Inertia\Inertia;


class ExpensesController extends Controller
{
    public function __construct(
        private Expense $model
    ) {}


    public function index()
    {
        $expenses = $this->model->query()
            ->orderBy('id', 'desc')
            ->paginate($request->per_page ?? config('pos.per_page'))
            ->withQueryString();

        return Inertia::render('expenses/index', [
            'expenses' => Inertia::merge($expenses->items()),
            'pagination' => Arr::except($expenses->toArray(), ['data', 'links'])
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
