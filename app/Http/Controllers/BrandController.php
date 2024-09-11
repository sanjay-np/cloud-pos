<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class BrandController extends Controller
{
    public function index(){
        return Inertia::render('Brands/Index');
    }
}
