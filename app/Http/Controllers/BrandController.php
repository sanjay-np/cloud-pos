<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Traits\ImageUpload;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BrandController extends Controller
{
    use ImageUpload;

    public function index()
    {
        return Inertia::render('Brands/Index');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);
        $logoPath = null;
        if ($request->hasFile('image')) {
            $logoPath = $this->uploadImage($request->file('image')['blobFile'], 'Brands');
        }

        $brand = Brand::create([
            'name' => $request->name,
            'description' => $request->description,
            'image' => $logoPath,
        ]);
        return to_route('brands.index');
    }
}
