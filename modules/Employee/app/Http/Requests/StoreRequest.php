<?php

namespace Modules\Employee\Http\Requests;

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
            'phone' => ['required', 'string', 'max:10'],
            'department' => ['required'],
            'position' => ['required'],
            'document_type' => ['required'],
            'document_number' => ['required', 'string', 'max:255'],
            'avatar' => ['nullable'],
            'document_files' => ['array'],
            'status' => ['required'],
        ];
    }

    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    public function getValidated(): array
    {
        return $this->only(keys: [
            'name',
            'phone',
            'department',
            'position',
            'document_type',
            'document_number',
            'status'
        ]);
    }

    public function getAvatar(): string
    {
        if (!$this->hasFile('avatar')) {
            return null;
        }
        $file = $this->file('avatar')['blobFile'];
        return $this->uploadImage($file, 'Employees/Avatar');
    }

    public function getDocuments(): array
    {
        if (!$this->has('document_files')) {
            return null;
        }
        $files = [];
        foreach ($this->document_files as $file) {
            $files[] = $this->uploadImage($file['blobFile'], 'Employees/Documents');
        }
        return $files;
    }
}
