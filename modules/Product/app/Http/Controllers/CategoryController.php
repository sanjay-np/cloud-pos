<?php

namespace Modules\Product\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Traits\InertiaResponseTrait;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Modules\Product\Http\Requests\Category\StoreRequest;
use Modules\Product\Http\Requests\Category\UpdateRequest;
use Modules\Product\Repositories\CategoryRepository;

class CategoryController extends Controller
{
    use InertiaResponseTrait;
    
    protected $categoryRepository;

    public function __construct(CategoryRepository $categoryRepository)
    {
        $this->categoryRepository = $categoryRepository;
    }

    public function index(Request $request)
    {
        $categories = $this->categoryRepository->paginate(perPage: 10);
        return Inertia::render('Product::Category', [
            'categories' => $categories
        ]);
    }

    public function store(StoreRequest $request)
    {
        $item = $this->categoryRepository->store($request->getValidated() + [
            'image' => $request->getImage()
        ]);
        if ($item) {
            return to_route('categories.index');
        }
    }

    public function show($id)
    {
        return $this->categoryRepository->findOrFail($id);
    }

    public function update(UpdateRequest $request, $id)
    {
        // Todo: update image
        $item = $this->categoryRepository->update($request->getValidated(), $id);
        if ($item) {
            return to_route('categories.index');
        }
    }

    public function destroy($id)
    {
        $item = $this->categoryRepository->delete($id);
        if ($item) {
            return to_route('categories.index');
        }
    }
}
