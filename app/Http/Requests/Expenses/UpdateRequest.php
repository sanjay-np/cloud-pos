<?php

namespace Modules\Expenses\Http\Requests;

use Carbon\Carbon;
use Illuminate\Foundation\Http\FormRequest;

class UpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'date' => 'required|date',
            'title' => 'required|string|max:255',
            'amount' => 'required|numeric|min:0',
            'description' => 'nullable|string',
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
                'title',
                'amount',
                'description'
            ]),
            [
                'date' => Carbon::parse($this->input('date'))->format('Y-m-d H:i:s'),
            ]
        );
    }
}
