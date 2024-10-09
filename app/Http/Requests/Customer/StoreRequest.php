<?php

namespace App\Http\Requests\Customer;

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
            //
        ];
    }

    public function getValues(): array
    {
        $data = $this->only(keys: [
            'name',
            'phone',
            'whatsapp',
            'address',
            'status'
        ]);
        $data['code'] = uniqid(prefix: 'CGS-');
        return $data;
    }

    public function getAvatar(): array
    {
        return $this->file('avatar');
    }
}
