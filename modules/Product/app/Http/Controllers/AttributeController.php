<?php

namespace Modules\Product\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Modules\Product\Http\Requests\Attribute\StoreRequest;
use Modules\Product\Http\Requests\Attribute\UpdateRequest;
use Modules\Product\Models\Attribute;

class AttributeController extends Controller
{
    public function __construct(private Attribute $model) {}

    public function index(Request $request)
    {
        $attributes = $this->model->orderBy('id', 'desc')->paginate(perPage: 10);
        return Inertia::render('Product::Attribute', [
            'attributes' => $attributes
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
