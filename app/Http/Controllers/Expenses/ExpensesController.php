<?php

namespace App\Http\Controllers\Expenses;

use App\Http\Controllers\Controller;
use App\Http\Requests\Expenses\StoreRequest;
use App\Http\Requests\Expenses\UpdateRequest;
use App\Models\Expense;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Arr;
use Inertia\Inertia;
use Inertia\Response;

class ExpensesController extends Controller
{
    public function __construct(
        private Expense $model
    ) {}


    public function index(): Response
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


    public function store(StoreRequest $request): RedirectResponse
    {
        try {
            $this->model->create($request->getRequested());
            return to_route('expenses.index');
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }


    public function show(int $id): Expense
    {
        return $this->model->findOrFail($id);
    }


    public function update(UpdateRequest $request, int $id): RedirectResponse
    {
        try {
            $this->model->findOrFail($id)->update($request->getRequested());
            return to_route('expenses.index');
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }


    public function destroy(int $id): RedirectResponse
    {
        try {
            $this->model->findOrFail($id)->delete();
            return to_route('expenses.index');
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }
}
