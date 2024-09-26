<?php

namespace App\Http\Controllers;

use App\Contracts\Product\AttributeServiceInterface;
use App\Http\Requests\AttributeRequest;
use App\Models\Attribute;
use Inertia\Inertia;

class AttributeController extends Controller
{
    protected $attributeService;

    public function __construct(AttributeServiceInterface $attributeService)
    {
        $this->attributeService = $attributeService;
    }

    public function index()
    {
        $attributes = $this->attributeService->paginate(perPage: 10);
        return Inertia::render('Attributes/Index', [
            'attributes' => $attributes
        ]);
    }


    public function store(AttributeRequest $request)
    {
        $attribute = $this->attributeService->store(data: $request->validated());
        return redirect(to: route(name: 'attributes.index'));
    }


    public function update(AttributeRequest $request, $id)
    {
        $attribute = $this->attributeService->update(data: $request->validated(), id: $id);
        return redirect(to: route(name: 'attributes.index'));
    }


    public function destroy(Attribute $attribute)
    {
        $this->attributeService->destroy(id: $attribute->id);
        return redirect(to: route(name: 'attributes.index'));
    }
}
