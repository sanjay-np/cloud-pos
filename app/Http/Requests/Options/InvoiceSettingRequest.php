<?php

namespace App\Http\Requests\Options;

use Illuminate\Foundation\Http\FormRequest;

class InvoiceSettingRequest extends FormRequest
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
            'invoice_number' => [
                'required',
                'string',
                'max:255'
            ],
            'invoice_date' => [
                'required',
                'string',
                'max:255'
            ],
            'invoice_footer' => [
                'required',
                'string',
                'max:255'
            ],
        ];
    }

    public function getRequested(): array
    {
        return [
            'invoice_number' => $this->input('invoice_number'),
            'invoice_date' => $this->input('invoice_date'),
            'invoice_footer' => $this->input('invoice_footer'),
        ];
    }
}
