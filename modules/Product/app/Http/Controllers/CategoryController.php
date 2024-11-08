<?php

namespace Modules\Product\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Modules\Product\Http\Requests\Category\StoreRequest;
use Modules\Product\Http\Requests\Category\UpdateRequest;
use Modules\Product\Interfaces\Category\CategoryServiceInterface;

class CategoryController extends Controller
{
    protected $categoryService;

    public function __construct(CategoryServiceInterface $categoryService)
    {
        $this->categoryService = $categoryService;
    }

    public function index()
    {
        $categories = $this->categoryService->paginate(perPage: 10);
        return Inertia::render('Product::Category', [
            'categories' => $categories
        ]);
    }

    public function store(StoreRequest $request)
    {
        $item = $this->categoryService->store($request->getValidated() + [
            'image' => $request->getImage()
        ]);
        if ($item) {
            return to_route('categories.index');
        }
    }

    public function show($id)
    {
        return $this->categoryService->show($id);
    }

    public function update(UpdateRequest $request, $id)
    {
        // Todo: update image
        $item = $this->categoryService->update($request->getValidated(), $id);
        if ($item) {
            return to_route('categories.index');
        }
    }

    public function destroy($id)
    {
        $item = $this->categoryService->destroy($id);
        if ($item) {
            return to_route('categories.index');
        }
    }
}
