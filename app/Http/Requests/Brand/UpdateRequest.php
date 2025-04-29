<?php

namespace App\Http\Requests\Brand;

use App\Traits\ImageUpload;
use Illuminate\Foundation\Http\FormRequest;

class UpdateRequest extends FormRequest
{
    use ImageUpload;
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
            'description' => [
                'nullable',
                'string'
            ],
            'image' => [
                'nullable'
            ]
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
        $requestedItem = $this->only(keys: [
            'name',
            'description',
        ]);
        $image = $this->getImage();
        if ($image !== null) {
            $requestedItem['image'] = $image;
        }
        return $requestedItem;
    }

    public function getImage(): string | null
    {
        if (!$this->hasFile('image')) {
            return null;
        }
        $file = $this->file('image');
        return $this->uploadImage($file, 'Brand');
    }
}
