<?php

namespace App\Http\Controllers\Products;

use App\Http\Controllers\Controller;
use App\Http\Requests\Attribute\StoreRequest;
use App\Http\Requests\Attribute\UpdateRequest;
use App\Models\Attribute;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Inertia\Inertia;
use Inertia\Response;

class AttributeController extends Controller
{
    public function __construct(
        private Attribute $model,
    ) {}


    public function index(Request $request): Response
    {
        $attributes = $this->model->query()
            ->applyFilter($request->all())
            ->orderBy('id', 'desc')
            ->paginate(perPage: 10);

        return Inertia::render('attribute/index', [
            'attributes' => Inertia::merge($attributes->items()),
            'pagination' => Arr::except($attributes->toArray(), ['data', 'links'])
        ]);
    }


    public function store(StoreRequest $request): RedirectResponse
    {
        try {
            $this->model->create($request->getRequested());
            return to_route('attributes.index');
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }


    public function show($id): Attribute
    {
        return $this->model->findOrFail($id);
    }


    public function update(UpdateRequest $request, $id): RedirectResponse
    {
        try {
            $this->model->findOrFail($id)->update($request->getRequested());
            return to_route('attributes.index');
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }


    public function destroy($id): RedirectResponse
    {
        try {
            $this->model->findOrFail($id)->delete();
            return to_route('attributes.index');
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }
}
