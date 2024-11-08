<?php

namespace Modules\Product\Http\Requests\Category;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'image' => ['nullable'],
            'description' => ['nullable', 'string'],
            'status' => ['required'],
        ];
    }

    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    public function getValidated(): array
    {
        return $this->only(keys: [
            'name',
            'description',
            'status'
        ]);
    }

    public function getImage(): string
    {
        if (!$this->hasFile('image')) {
            return null;
        }
        $file = $this->file('image')['blobFile'];
        return $this->uploadImage($file, 'Category');
    }
}
