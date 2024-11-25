<?php

namespace Modules\Product\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Modules\Product\Http\Requests\Category\StoreRequest;
use Modules\Product\Http\Requests\Category\UpdateRequest;
use Modules\Product\Models\Category;

class CategoryController extends Controller
{
    public function __construct(private Category $model) {}

    public function index(Request $request)
    {
        $categories = $this->model->orderBy('id', 'desc')->paginate(perPage: 10);
        return Inertia::render('Product::Category', [
            'categories' => $categories
        ]);
    }

    public function store(StoreRequest $request)
    {
        $item = $this->model->create($request->getRequested());
        if ($item) {
            return to_route('categories.index');
        }
    }

    public function show($id)
    {
        return $this->model->findOrFail($id);
    }

    public function update(UpdateRequest $request, $id)
    {
        // Todo: update image
        $item = $this->model->findOrFail($id)->update($request->getRequested());
        if ($item) {
            return to_route('categories.index');
        }
    }

    public function destroy($id)
    {
        $item = $this->model->findOrFail($id)->delete();
        if ($item) {
            return to_route('categories.index');
        }
    }
}
