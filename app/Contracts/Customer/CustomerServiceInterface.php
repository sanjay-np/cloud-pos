<?php

namespace App\Contracts\Customer;

interface CustomerServiceInterface
{
    public function paginate(int $perPage);
}
