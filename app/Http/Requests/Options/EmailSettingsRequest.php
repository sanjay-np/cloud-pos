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
            'email_name' => [
                'required',
                'string',
                'max:255'
            ],
            'email_subject' => [
                'required',
                'string',
                'max:255'
            ],
            'email_logo' => [
                'required',
                'string',
                'max:255',
                'image'
            ],
            'email_footer' => [
                'required',
                'string',
                'max:255'
            ],
        ];
    }


    public function getRequested(): array
    {
        return [
            'email_from' => $this->input('email_from'),
            'email_name' => $this->input('email_name'),
            'email_subject' => $this->input('email_subject'),
            'email_logo' => $this->input('email_logo'),
            'email_footer' => $this->input('email_footer'),
        ];
    }
}
