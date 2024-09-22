<?php

namespace App\Http\Controllers;

use App\Models\Attribute;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AttributeController extends Controller
{
    
    public function index()
    {
        return Inertia::render('Attributes/Index');
    }

    
    public function store(Request $request)
    {
        //
    }

    
    public function update(Request $request, Attribute $attribute)
    {
        //
    }

    
    public function destroy(Attribute $attribute)
    {
        //
    }
}
