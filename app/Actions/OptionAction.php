<?php

namespace App\Actions;

use App\Models\Option;

class OptionAction
{
    public function __construct(
        private Option $model
    ) {}


    public function upsert(string $key, string $value, ?string $category = null): void
    {
        $this->model->updateOrCreate(
            [
                'meta_key' => $key,
            ],
            [
                'meta_value' => $value,
                'meta_category' => $category,
            ]
        );
    }
}
