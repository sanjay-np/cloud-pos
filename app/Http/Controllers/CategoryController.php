<?php

namespace App\Http\Controllers;

use App\CategoryRepository;
use App\Contracts\Product\CategoryServiceInterface;
use App\Http\Requests\CategoryRequest;
use App\Models\Category;
use Illuminate\Http\Request;
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
    public function store(CategoryRequest $request)
    {
        $this->categoryService->store(data: $request->validated());
        return redirect(to: route(name: 'categories.index'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CategoryRequest $request, $id)
    {
        $this->categoryService->update(data: $request->validated(), id: $id);
        return redirect(to: route(name: 'categories.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $this->categoryService->destroy(id: $id);
        return redirect(to: route(name: 'categories.index'));
    }
}
