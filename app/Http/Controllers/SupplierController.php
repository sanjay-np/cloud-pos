<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SupplierController extends Controller
{

    public function index()
    {
        $brands = Brand::select('id', 'name')->get()->map(function ($brand) {
            return [
                'value' => $brand->id,
                'label' => $brand->name
            ];
        })->toArray();
        return Inertia::render('Suppliers/Index', [
            'brands' => $brands
        ]);
    }
}
