<?php

namespace App\Http\Requests\Category;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'name' => [
                'required',
                'string',
                'max:255'
            ],
            'image' => [
                'nullable'
            ],
            'description' => [
                'nullable',
                'string'
            ],
            'status' => [
                'required'
            ],
        ];
    }

    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }


    public function getRequested(): array
    {
        $requestedItems = $this->only(keys: [
            'name',
            'description',
            'status'
        ]);

        $image = $this->getImage();
        if ($image == null) {
            $requestedItems = $image;
        }

        return $requestedItems;
    }


    public function getImage(): string | null
    {
        if (!$this->hasFile('image')) {
            return null;
        }
        $file = $this->file('image');
        return $this->uploadImage($file, 'Category');
    }
}
