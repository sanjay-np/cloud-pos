<?php

namespace Modules\Customer\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            //
        ];
    }

    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
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
        return $data;
    }

    public function getAvatar(): array | null
    {
        return $this->file('avatar');
    }
}
