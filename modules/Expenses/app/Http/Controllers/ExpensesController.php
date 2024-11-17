<?php

namespace Modules\Expenses\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Traits\InertiaResponseTrait;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Modules\Expenses\Http\Requests\StoreRequest;
use Modules\Expenses\Http\Requests\UpdateRequest;
use Modules\Expenses\Repositories\ExpensesRepository;

class ExpensesController extends Controller
{
    use InertiaResponseTrait;

    protected $expensesRepository;

    public function __construct(ExpensesRepository $expensesRepository)
    {
        $this->expensesRepository = $expensesRepository;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Expenses::Index');
    }

    public function store(StoreRequest $request)
    {
        try {
            $item = $this->expensesRepository->store($request->getValidated());
            $this->handleInertiaResponse($item, 'Expense created successfully');
        } catch (\Exception $e) {
            $this->error($e->getMessage());
        }
    }

    public function show(int $id)
    {
        $item = $this->expensesRepository->findOrFail($id);
        return $item;
    }

    public function update(UpdateRequest $request, int $id)
    {
        try {
            $item = $this->expensesRepository->update($request->getValidated(), $id);
            $this->handleInertiaResponse($item, 'Expense updated successfully');
        } catch (\Exception $e) {
            $this->error($e->getMessage());
        }
    }

    public function destroy(int $id)
    {
        try {
            $this->expensesRepository->delete($id);
            $this->success('Expense deleted successfully');
        } catch (\Exception $e) {
            $this->error($e->getMessage());
        }
    }
}
