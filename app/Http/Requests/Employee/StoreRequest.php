<?php

namespace App\Http\Requests\Employee;

use Illuminate\Foundation\Http\FormRequest;

class StoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'phone' => ['required', 'string', 'max:10'],
            'department' => ['required'],
            'position' => ['required'],
            'document_type' => ['required'],
            'document_number' => ['required', 'string', 'max:255'],
            'avatar' => ['nullable'],
            'document_files' => ['array'],
            'status' => ['required'],
        ];
    }
}
