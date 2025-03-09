<?php

namespace App\Http\Requests\Brand;

use App\Traits\ImageUpload;
use Illuminate\Foundation\Http\FormRequest;

class StoreRequest extends FormRequest
{
    use ImageUpload;

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'image' => ['nullable']
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
        return array_merge(
            $this->only(keys: [
                'name',
                'description',
            ]),
            [
                'image' => $this->getImage()
            ]
        );
    }

    public function getImage(): string |null
    {
        if (!$this->hasFile('image')) {
            return null;
        }
        $file = $this->file('image')['blobFile'];
        return $this->uploadImage($file, 'Brand');
    }
}
