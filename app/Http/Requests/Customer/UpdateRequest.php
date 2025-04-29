<?php

namespace App\Http\Requests\Customer;

use App\Traits\ImageUpload;
use Illuminate\Foundation\Http\FormRequest;

class UpdateRequest extends FormRequest
{
    use ImageUpload;

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'name' => [
                'required',
                'string',
                'max:255'
            ],
            'phone' => [
                'required',
                'string',
                'max:255',
            ],
            'email' => [
                'nullable',
                'string',
                'max:255',
            ],
            'whatsapp' => [
                'nullable',
                'string',
                'max:255',
            ],
            'address' => [
                'required',
                'string',
                'max:255'
            ],
            'avatar' => [
                'nullable'
            ],
            'status' => [
                'required',
                'string'
            ],
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
        $requestedItems = $this->only(keys: [
            'name',
            'phone',
            'whatsapp',
            'address',
            'status'
        ]);
        $avatar = $this->getAvatar();
        if ($avatar !== null) {
            $requestedItems['avatar'] = $avatar;
        }
        return $requestedItems;
    }

    public function getAvatar(): string | null
    {
        if (!$this->hasFile('avatar')) {
            return null;
        }
        $file = $this->file('avatar');
        return $this->uploadImage($file, 'Customers/Avatar');
    }
}
