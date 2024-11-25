<?php

namespace Modules\Customer\Http\Requests;

use App\Traits\ImageUpload;
use Illuminate\Foundation\Http\FormRequest;

class StoreRequest extends FormRequest
{
    use ImageUpload;
    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'phone' => ['required', 'string', 'max:255'],
            'whatsapp' => ['required', 'string', 'max:255'],
            'address' => ['required', 'string', 'max:255'],
            'avatar' => ['nullable'],
            'status' => ['required', 'string'],
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

    public function getAvatar(): string
    {
        if (!$this->hasFile('avatar')) {
            return null;
        }
        $file = $this->file('avatar')['blobFile'];
        return $this->uploadImage($file, 'Customers/Avatar');
    }
}
