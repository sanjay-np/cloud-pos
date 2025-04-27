<?php

namespace App\Http\Requests\Sales;

use Illuminate\Foundation\Http\FormRequest;

class PaymentRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'sale_id' => [
                'required',
                'integer',
                'exists:sales,id'
            ],
            'amount' => [
                'required',
                'numeric',
            ],
            'payment_method' => [
                'required',
                'string',
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


    public function getRequested()
    {
        return $this->only(keys: [
            'amount',
            'payment_method',
            'note',
        ]);
    }
}
