<?php

namespace App\Http\Requests\Customer;

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

    public function getRequested(): array
    {
        return array_merge($this->only(keys: [
            'name',
            'phone',
            'whatsapp',
            'address',
            'status'
        ]), [
            'avatar' => $this->getAvatar()
        ]);
    }

    public function getAvatar(): array | null
    {
        if (!$this->hasFile('avatar')) {
            return null;
        }
        $file = $this->file('avatar')['blobFile'];
        return $this->uploadImage($file, 'Customers/Avatar');
    }
}
