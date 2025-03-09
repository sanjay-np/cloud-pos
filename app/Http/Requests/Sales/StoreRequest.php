<?php

namespace App\Http\Requests\Sales;

use Carbon\Carbon;
use Illuminate\Foundation\Http\FormRequest;

class StoreRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'date' => ['required', 'date'],
            'customer_id' => ['required'],
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
        $totalAmount = $this->input('total_amount');
        $paidAmount = $this->input('paid_amount');
        $paymentStatus = ($paidAmount >= $totalAmount) ? 'paid' : ($paidAmount > 0 ? 'due' : 'unpaid');
        $dueAmount = $totalAmount - $paidAmount;

        return array_merge(
            $this->only(keys: [
                'customer_id',
                'tax_percentage',
                'tax_amount',
                'discount_amount',
                'shipping_amount',
                'total_amount',
                'paid_amount',
                'status',
                'note',
                'payment_method',
            ]),
            [
                'date' => Carbon::parse($this->input('date'))->format('Y-m-d H:i:s'),
                'payment_status' => $paymentStatus,
                'due_amount' => $dueAmount
            ]
        );
    }

    public function getRequestedProducts(): array
    {
        return $this->only(keys: [
            'products'
        ]);
    }

    public function getRequestedPayment(): array
    {
        return array_merge(
            $this->only(keys: [
                'payment_method',
                'note',
            ]),
            [
                'date' => Carbon::parse($this->input('date'))->format('Y-m-d H:i:s'),
                'amount' => $this->input('paid_amount')
            ]
        );
    }
}
