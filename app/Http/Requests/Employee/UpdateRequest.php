<?php

namespace App\Http\Requests\Employee;

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
        return array_merge(
            $this->only(keys: [
                'name',
                'phone',
                'department',
                'position',
                'document_type',
                'document_number',
                'status'
            ]),
            [
                'avatar' => $this->getAvatar(),
                'document_files' => $this->getDocuments(),
            ]
        );
    }

    public function getAvatar(): string | null
    {
        if (!$this->hasFile('avatar')) {
            return null;
        }
        $file = $this->file('avatar')['blobFile'];
        return $this->uploadImage($file, 'Employees/Avatar');
    }

    public function getDocuments(): array | null
    {
        if (!$this->has('document_files')) {
            return null;
        }
        $files = [];
        foreach ($this->document_files as $file) {
            if (isset($file['blobFile']) && !empty($file['blobFile'])) {
                $files[] = $this->uploadImage($file['blobFile'], 'Employees/Documents');
            }
        }
        return $files ?? null;
    }
}
