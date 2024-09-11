<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class SupplierController extends Controller
{

    public function index(){
        return Inertia::render('Suppliers/Index');
    }
}
