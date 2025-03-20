<?php

namespace App\Http\Requests\Product;

use App\Traits\ImageUpload;
use Illuminate\Foundation\Http\FormRequest;

class StoreRequest extends FormRequest
{
    use ImageUpload;
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'title' => [
                'required',
                'string',
                'max:255'
            ],
            'sale_price' => [
                'required',
                'string',
                'max:255'
            ],
            'product_type' => [
                'required'
            ],
            'unit' => [
                'required'
            ],
            'status' => [
                'required'
            ],
        ];
    }


    public function getRequested()
    {
        return array_merge(
            $this->only(keys: [
                'title',
                'sku',
                'bar_code',
                'description',
                'unit_price',
                'sale_price',
                'stock_qty',
                'category_ids',
                'brand_id',
                'supplier_id',
                'tags',
                'product_type',
                'unit',
                'status',
            ]),
            [
                'main_image' => $this->getMainImage(),
                'gallery_images' => $this->getGalleryImages(),
            ]
        );
    }

    public function getMainImage(): string | null
    {
        if (!$this->hasFile('main_image')) {
            return null;
        }
        $file = $this->file('main_image');
        return $this->uploadImage($file, 'Products');
    }

    public function getGalleryImages(): array | null
    {
        if (!$this->has('gallery_images')) {
            return null;
        }
        $files = [];
        foreach ($this->gallery_images as $file) {
            $files[] = $this->uploadImage($file, 'Products');
        }
        return $files;
    }
}
