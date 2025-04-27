<?php

namespace App\Http\Requests\Purchase;

use Illuminate\Foundation\Http\FormRequest;

class PaymentRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'payment_method' => [
                'required'
            ],
            'note' => [
                'nullable',
                'string'
            ],
            'amount' => [
                'required',
                'numeric'
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
        return array_merge(
            $this->only(keys: [
                'payment_method',
                'note',
            ]),
            [
                'date' => now()->format('Y-m-d H:i:s'),
                'amount' => $this->input('amount')
            ]
        );
    }
}
