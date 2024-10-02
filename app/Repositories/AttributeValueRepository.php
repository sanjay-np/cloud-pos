<?php

namespace App\Repositories;

use App\Contracts\AttributeValue\AttributeValueRepositoryInterface;
use App\Models\AttributeValue;

class AttributeValueRepository implements AttributeValueRepositoryInterface
{

    protected $model;

    public function __construct(AttributeValue $model)
    {
        $this->model = $model;
    }

    public function store(array $data)
    {
        return $this->model->create($data);
    }
}
