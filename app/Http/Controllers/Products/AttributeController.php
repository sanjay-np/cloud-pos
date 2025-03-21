<?php

namespace App\Http\Controllers\Products;

use App\Actions\AttributeAction;
use App\Http\Controllers\Controller;
use App\Http\Requests\Attribute\StoreRequest;
use App\Http\Requests\Attribute\UpdateRequest;
use App\Models\Attribute;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Inertia\Inertia;

class AttributeController extends Controller
{
    public function __construct(
        private Attribute $model,
    ) {}


    public function index(Request $request)
    {
        $attributes = $this->model->query()
            ->applyFilter($request->all())
            ->orderBy('id', 'desc')
            ->withTrashed()
            ->paginate(perPage: 10);

        return Inertia::render('attribute/index', [
            'attributes' => Inertia::merge($attributes->items()),
            'pagination' => Arr::except($attributes->toArray(), ['data', 'links'])
        ]);
    }


    public function store(StoreRequest $request)
    {
        $item = $this->model->create($request->getRequested());
        if ($item) {
            return to_route('attributes.index');
        }
    }


    public function show($id)
    {
        return $this->model->findOrFail($id);
    }


    public function update(UpdateRequest $request, $id)
    {
        $item = $this->model->findOrFail($id)->update($request->getRequested());
        if ($item) {
            return to_route('attributes.index');
        }
    }


    public function destroy($id)
    {
        $item = $this->model->findOrFail($id)->delete();
        if ($item) {
            return to_route('attributes.index');
        }
    }
}
