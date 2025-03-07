<?php

namespace Modules\Purchase\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'date' => ['required', 'date'],
            'supplier_id' => ['required'],
            'tax_percentage' => ['required'],
            'tax_amount' => ['required'],
            'discount_amount'  => ['required'],
            'shipping_amount' => ['required'],
            'total_amount' => ['required'],
            'paid_amount' => ['required', 'numeric'],
            'status' => ['required'],
            'payment_method' => ['required'],
            'products' => ['array', 'min:1'],
            'products.*.id' => ['required'],
            'products.*.qty' => ['required', 'numeric'],
            'products.*.unit_price' => ['required', 'numeric'],
            'products.*.sale_price' => ['required', 'numeric'],
            'note' => ['nullable', 'string'],
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
            'status',
        ]);
    }
}
