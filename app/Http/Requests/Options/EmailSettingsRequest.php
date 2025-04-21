<?php

namespace App\Http\Requests\Options;

use Illuminate\Foundation\Http\FormRequest;

class EmailSettingsRequest extends FormRequest
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
            'email_from' => [
                'required',
                'string',
                'max:255'
            ],
            'mail_host' => [
                'required',
                'string',
                'max:255'
            ],
            'mail_port' => [
                'required',
                'string',
                'max:255',
            ],
            'mail_username' => [
                'required',
                'string',
                'max:255'
            ],
            'mail_password' => [
                'required',
                'string',
                'max:255',
            ],
        ];
    }


    public function getRequested(): array
    {
        return $this->only(keys: [
            'email_from',
            'mail_host',
            'mail_port',
            'mail_username',
            'mail_password',
        ]);
    }
}
