<?php

namespace Modules\Customer\Interfaces;

interface CustomerRepositoryInterface
{
    public function take(int $count);

    public function search(string $search_qry);
}
