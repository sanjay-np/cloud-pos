<?php

namespace App\Http\Controllers;

use App\Contracts\Attribute\AttributeServiceInterface;
use App\Http\Requests\Attribute\StoreRequest;
use App\Http\Requests\Attribute\UpdateRequest;
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

    public function store(StoreRequest $request)
    {
        $item = $this->attributeService->store(data: $request->validated());
        if ($item) {
            return redirect(to: route(name: 'attributes.index'));
        }
    }

    public function find($id)
    {
        return $this->attributeService->find(id: $id);
    }

    public function update(UpdateRequest $request, $id)
    {
        $item = $this->attributeService->update(data: $request->validated(), id: $id);
        if ($item) {
            return redirect(to: route(name: 'attributes.index'));
        }
    }


    public function destroy($id)
    {
        $item = $this->attributeService->destroy(id: $id);
        if ($item) {
            return redirect(to: route(name: 'attributes.index'));
        }
    }
}
