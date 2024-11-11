<?php

namespace Modules\Product\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Modules\Product\Http\Requests\Attribute\StoreRequest;
use Modules\Product\Http\Requests\Attribute\UpdateRequest;
use Modules\Product\Repositories\AttributeRepository;

class AttributeController extends Controller
{
    protected $attributeRepository;

    public function __construct(AttributeRepository $attributeRepository)
    {
        $this->attributeRepository = $attributeRepository;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $attributes = $this->attributeRepository->paginate(perPage: 10);
        return Inertia::render('Product::Attribute', [
            'attributes' => $attributes
        ]);
    }

    public function store(StoreRequest $request)
    {
        $item = $this->attributeRepository->store($request->getValidated());
        if ($item) {
            return to_route('attributes.index');
        }
    }

    public function show($id)
    {
        return $this->attributeRepository->findOrFail($id);
    }

    public function update(UpdateRequest $request, $id)
    {
        $item = $this->attributeRepository->update($request->getValidated(), $id);
        if ($item) {
            return to_route('attributes.index');
        }
    }

    public function destroy($id)
    {
        $item = $this->attributeRepository->delete($id);
        if ($item) {
            return to_route('attributes.index');
        }
    }
}
