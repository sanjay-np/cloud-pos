<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class OptionController extends Controller
{
    public function index()
    {
        return Inertia::render('settings/options/index');
    }
}
