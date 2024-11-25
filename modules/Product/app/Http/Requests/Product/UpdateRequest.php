<?php

namespace Modules\Product\Http\Requests\Product;

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
}
