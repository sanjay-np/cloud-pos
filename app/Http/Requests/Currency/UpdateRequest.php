<?php

namespace App\Http\Requests\Currency;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

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
            'label' => [
                'required',
                'string',
                'max:255',
                Rule::unique('currencies')->ignore($this->currency)
            ],
            'is_current' => [
                'required',
                'boolean'
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
        return $this->only(keys: [
            'name',
            'label',
            'is_current',
        ]);
    }
}
