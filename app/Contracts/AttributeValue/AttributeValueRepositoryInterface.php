<?php

namespace App\Contracts\AttributeValue;

interface AttributeValueRepositoryInterface
{
    public function store(array $data);
}
