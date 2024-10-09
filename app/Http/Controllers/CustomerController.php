<?php

namespace App\Http\Controllers;

use App\Contracts\Customer\CustomerServiceInterface;
use Inertia\Inertia;

class CustomerController extends Controller
{
    protected $customerService;

    public function __construct(CustomerServiceInterface $customerService)
    {
        $this->customerService = $customerService;
    }



    public function index()
    {
        return Inertia::render('Customers/Index');
    }
}
