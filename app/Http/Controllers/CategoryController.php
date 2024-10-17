<?php

namespace App\Http\Controllers;

use App\Contracts\Category\CategoryServiceInterface;
use App\Http\Requests\Category\StoreRequest;
use App\Http\Requests\Category\UpdateRequest;
use Inertia\Inertia;

class CategoryController extends Controller
{
    protected $categoryService;

    public function __construct(CategoryServiceInterface $categoryService)
    {
        $this->categoryService = $categoryService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = $this->categoryService->paginate(perPage: 10);
        return Inertia::render('Categories/Index', [
            'categories' => $categories
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        $item = $this->categoryService->store(data: $request->validated());
        if ($item) {
            return redirect(to: route(name: 'categories.index'));
        }
    }

    public function find($id)
    {
        return $this->categoryService->find(id: $id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, $id)
    {
        $item = $this->categoryService->update(data: $request->all(), id: $id);
        if ($item) {
            return redirect(to: route(name: 'categories.index'));
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $item = $this->categoryService->destroy(id: $id);
        if ($item) {
            return redirect(to: route(name: 'categories.index'));
        }
    }
}
