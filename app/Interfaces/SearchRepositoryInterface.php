<?php

namespace App\Interfaces;

interface SearchRepositoryInterface
{
    public function take(int $count);

    public function search(string $search_qry);
}
