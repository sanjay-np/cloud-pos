<?php

namespace App\Http\Requests\Employee;

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
                'max:10'
            ],
            'department' => [
                'required'
            ],
            'position' => [
                'required'
            ],
            'document_type' => [
                'required'
            ],
            'document_number' => [
                'required',
                'string',
                'max:255'
            ],
            'avatar' => [
                'nullable'
            ],
            'document_files' => [
                'nullable',
                'array'
            ],
            'status' => [
                'required'
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
            'department',
            'position',
            'document_type',
            'document_number',
            'status'
        ]);
        $avatar = $this->getAvatar();
        if ($avatar !== null) {
            $requestedItems['avatar'] = $avatar;
        }

        $documents = $this->getDocuments();
        if ($documents !== null) {
            $requestedItems['document_files'] = $documents;
        }

        return $requestedItems;
    }


    public function getAvatar(): string | null
    {
        if (!$this->hasFile('avatar')) {
            return null;
        }
        $file = $this->file('avatar');
        return $this->uploadImage($file, 'Employees/Avatar');
    }


    public function getDocuments(): array | null
    {
        if (!$this->has('document_files')) {
            return null;
        }
        if ($this->document_files && count($this->document_files) > 0) {
            foreach ($this->document_files as $file) {
                if (isset($file) && !empty($file)) {
                    $files[] = $this->uploadImage($file, 'Employees/Documents');
                }
            }
        }
        return $files ?? null;
    }
}
