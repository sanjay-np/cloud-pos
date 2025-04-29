<?php

namespace App\Http\Requests\Options;

use Illuminate\Foundation\Http\FormRequest;

class ShopInformationRequest extends FormRequest
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
            'shop_name' => [
                'required',
                'string',
                'max:255'
            ],
            'shop_address' => [
                'required',
                'string',
                'max:255'
            ],
            'shop_phone' => [
                'required',
                'string',
                'max:255',
            ],
            'shop_logo' => [
                'nullable',
                'string',
                'max:255'
            ],
        ];
    }


    public function getRequested(): array
    {
        return [
            'shop_name' => $this->input('shop_name'),
            'shop_address' => $this->input('shop_address'),
            'shop_phone' => $this->input('shop_phone'),
            'shop_email' => $this->input('shop_email'),
            'shop_logo' => $this->input('shop_logo'),
        ];
    }
}
