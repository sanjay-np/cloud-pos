<?php

namespace App\Http\Requests\Purchase;

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
            'date' => ['required', 'date'],
            'supplier_id' => ['required'],
            'tax_percentage' => ['required'],
            'tax_amount' => ['required'],
            'discount_amount'  => ['required'],
            'shipping_amount' => ['required'],
            'total_amount' => ['required'],
            'paid_amount' => ['required'],
            'status' => ['required'],
            'payment_method' => ['required'],
            'note' => ['string'],
            'products' => ['array'],
            'products.*.product_id' => ['required'],
            'products.*.qty' => ['required', 'numeric'],
            'products.*.unit_price' => ['required', 'numeric'],
            'products.*.sale_price' => ['required', 'numeric'],
        ];
    }

    public function valuesToStore()
    {
        return [
            'purchase' => $this->only(keys: [
                'date',
                'supplier_id',
                'tax_percentage',
                'tax_amount',
                'discount_amount',
                'shipping_amount',
                'total_amount',
                'paid_amount',
                'status',
                'payment_status',
                'payment_method',
                'note',
            ]),
            'products' =>  $this->only(keys: [
                'products'
            ]),
            'payments' =>  $this->only(keys: [
                'paid_amount',
                'date',
                'payment_method',
                'note',
            ]),
        ];
    }
}
