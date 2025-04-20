<?php

namespace App\Http\Requests\Options;

use Illuminate\Foundation\Http\FormRequest;

class PaymentSettingRequest extends FormRequest
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
            'payment_method' => [
                'required',
                'string',
                'max:255'
            ],
            'payment_email' => [
                'required',
                'string',
                'max:255'
            ],
            'payment_footer' => [
                'required',
                'string',
                'max:255'
            ],
        ];
    }


    public function getRequested(): array
    {
        return [
            'payment_method' => $this->input('payment_method'),
            'payment_email' => $this->input('payment_email'),
            'payment_footer' => $this->input('payment_footer'),
        ];
    }
}
