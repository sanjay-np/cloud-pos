<?php

namespace App\Http\Controllers\Products;

use App\Http\Controllers\Controller;
use App\Http\Requests\Category\StoreRequest;
use App\Http\Requests\Category\UpdateRequest;
use App\Models\Category;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Inertia\Inertia;
use Inertia\Response;

class CategoryController extends Controller
{
    public function __construct(
        private Category $model
    ) {}


    public function index(Request $request): Response
    {
        $categories = $this->model->query()
            ->with(['parent:id,name'])
            ->applyFilter($request->all())
            ->orderBy('id', 'desc')
            ->paginate($request->per_page ?? config('pos.per_page'))
            ->withQueryString();


        $parentCategories = $this->model->query()
            ->withTrashed()
            ->select(["id", "name"])->get()?->map(fn($item) => [
                'label' => $item->name,
                'value' => $item->id
            ]);

        return Inertia::render('category/index', [
            'categories' => Inertia::merge($categories->items()),
            'pagination' => Arr::except($categories->toArray(), ['data', 'links']),
            'parentCategories' => $parentCategories
        ]);
    }


    public function store(StoreRequest $request): RedirectResponse
    {
        try {
            $this->model->create($request->getRequested());
            return to_route('categories.index');
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }


    public function show($id): Category
    {
        return $this->model->findOrFail($id);
    }


    public function update(UpdateRequest $request, $id): RedirectResponse
    {
        try {
            $this->model->findOrFail($id)->update($request->getRequested());
            return to_route('categories.index');
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }


    public function destroy($id): RedirectResponse
    {
        try {
            $this->model->findOrFail($id)->delete();
            return to_route('categories.index');
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }
}
