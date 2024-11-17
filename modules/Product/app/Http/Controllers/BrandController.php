<?php

namespace Modules\Product\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Traits\InertiaResponseTrait;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Modules\Product\Http\Requests\Brand\StoreRequest;
use Modules\Product\Http\Requests\Brand\UpdateRequest;
use Modules\Product\Repositories\BrandRepository;

class BrandController extends Controller
{
    use InertiaResponseTrait;
    
    protected $brandRepository;

    public function __construct(BrandRepository $brandRepository)
    {
        $this->brandRepository = $brandRepository;
    }

    public function index(Request $request)
    {
        $brands = $this->brandRepository->paginate(perPage: 10);
        return Inertia::render('Product::Brand', [
            'brands' => $brands
        ]);
    }

    public function store(StoreRequest $request)
    {
        $item = $this->brandRepository->store($request->getValidated() + [
            'image' => $request->getImage()
        ]);
        if ($item) {
            return to_route('brands.index');
        }
    }

    public function show($id)
    {
        return $this->brandRepository->findorFail($id);
    }

    public function update(UpdateRequest $request, $id)
    {
        // Todo: update image
        $item = $this->brandRepository->update($request->getValidated(), $id);
        if ($item) {
            return to_route('brands.index');
        }
    }

    public function destroy($id)
    {
        $item = $this->brandRepository->delete($id);
        if ($item) {
            return to_route('brands.index');
        }
    }

    public function take(int $count)
    {
        return $this->brandRepository->take($count);
    }

    public function search(string $search_qry)
    {
        return $this->brandRepository->search($search_qry);
    }
}
