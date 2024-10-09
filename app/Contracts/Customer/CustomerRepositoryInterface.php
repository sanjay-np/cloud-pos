<?php

namespace App\Contracts\Customer;

interface CustomerRepositoryInterface
{
    public function paginate(int $perPage);
}
