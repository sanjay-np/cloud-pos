<?php

namespace Modules\Product\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Modules\Product\Http\Requests\Attribute\StoreRequest;
use Modules\Product\Http\Requests\Attribute\UpdateRequest;
use Modules\Product\Interfaces\Attribute\AttributeServiceInterface;

class AttributeController extends Controller
{
    protected $attributeService;

    public function __construct(AttributeServiceInterface $attributeService)
    {
        $this->attributeService = $attributeService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $attributes = $this->attributeService->paginate(perPage: 10);
        return Inertia::render('Product::Attribute', [
            'attributes' => $attributes
        ]);
    }

    public function store(StoreRequest $request)
    {
        $item = $this->attributeService->store($request->getValidated());
        if ($item) {
            return to_route('attributes.index');
        }
    }

    public function show($id)
    {
        return $this->attributeService->show($id);
    }

    public function update(UpdateRequest $request, $id)
    {
        $item = $this->attributeService->update($request->getValidated(), $id);
        if ($item) {
            return to_route('attributes.index');
        }
    }

    public function destroy($id)
    {
        $item = $this->attributeService->destroy($id);
        if ($item) {
            return to_route('attributes.index');
        }
    }
}
