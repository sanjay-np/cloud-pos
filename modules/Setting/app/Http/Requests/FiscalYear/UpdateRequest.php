<?php

namespace Modules\Setting\Http\Requests\FiscalYear;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'label' => ['required', 'string', 'max:255', 'unique:fiscal_years'],
            'is_current' => ['required', 'boolean'],
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
            'label',
            'is_current',
        ]);
    }
}
