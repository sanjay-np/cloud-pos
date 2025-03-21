import { usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TagPicker } from "@/components/ui/tag-picker";
import { Textarea } from "@/components/ui/textarea";
import AppSelect from "@/components/app/app-select";
import { TagInput } from "@/components/ui/tag-input";
import AvatarUpload from "@/components/ui/avatar-upload";

import { validateImageFile } from "@/lib/utils";

const ProductForm = ({ data, setData, errors, isProcessing }: any) => {

    const { categories, brands, suppliers } = usePage().props as any
    const [selectedCategories, setSelectedCategories] = useState<number[]>(data.category_ids ?? [])

    useEffect(() => {
        setData('category_ids', selectedCategories)
    }, [selectedCategories])

    useEffect(() => {
        setSelectedCategories(data?.category_ids);
    }, [data?.brands])

    const handleImageUpload = async (file: File) => {
        const isValid = validateImageFile(file);
        if (!isValid) return;
        setData('main_image', file)
    }

    if (isProcessing) {
        return (
            <div>
                {/* Todo: Add Skeletion */}
                Loading...
            </div>
        )
    }

    return (
        <div className="grid gap-4 px-4">
            <div className="flex w-full gap-4 items-center mb-2">
                <div className="relative">
                    <AvatarUpload
                        onImageUpload={handleImageUpload}
                        fallback="PI"
                        size="lg"
                        initialImage={data?.image_url}
                    />
                </div>
                <div className="text-left">
                    <h2 className="font-semibold text-lg">Product Picture</h2>
                    <p className="text-muted-foreground text-xs">Upload a profile picture to personalize customer's account</p>
                </div>
            </div>
            <div className="grid w-full gap-2">
                <Label>Product Name</Label>
                <Input
                    type="text"
                    placeholder="Enter Product Name..."
                    defaultValue={data.title}
                    onChange={(e) => setData('title', e.target.value)}
                />
            </div>
            <div className="grid grid-cols-3 w-full gap-2">
                <div className="item">
                    <Label>Initial Qty</Label>
                    <Input
                        type="text"
                        placeholder="Stock Qty..."
                        defaultValue={data.stock_qty}
                        onChange={(e) => setData('stock_qty', e.target.value)}
                    />
                </div>
                <div className="item">
                    <Label>Item Purchase Price</Label>
                    <Input
                        type="text"
                        placeholder="Purchase Price..."
                        defaultValue={data.purchase_price}
                        onChange={(e) => setData('purchase_price', e.target.value)}
                    />
                </div>
                <div className="item">
                    <Label>Item Sale Price</Label>
                    <Input
                        type="text"
                        placeholder="Sale Price..."
                        defaultValue={data.sale_price}
                        onChange={(e) => setData('sale_price', e.target.value)}
                    />
                </div>
            </div>
            <div className="grid w-full gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                    placeholder="Description"
                    id="description"
                    className="border"
                    defaultValue={data.description}
                    rows={5}
                    onChange={(e) => setData('description', e.target.value)}
                />
            </div>
            <div className="grid grid-cols-3 w-full gap-2">
                <div className="item">
                    <Label>Product Category</Label>
                    <TagPicker
                        tags={categories ?? []}
                        selectedTagIds={selectedCategories}
                        setSelectedTagIds={setSelectedCategories}
                        placeholder="Product Category..."
                        emptyMessage="No matching Category found"
                        noTagsMessage="No Categories found"
                    />
                </div>
                <div className="item">
                    <Label>Product Brand</Label>
                    <AppSelect
                        placeholder="Product Brand"
                        selected={data.brand_id}
                        options={brands ?? []}
                        onChange={(val) => setData("brand_id", val)}
                    />
                </div>
                <div className="item">
                    <Label>Product Supplier</Label>
                    <AppSelect
                        placeholder="Product Supplier"
                        selected={data.supplier_id}
                        options={suppliers ?? []}
                        onChange={(val) => setData("supplier_id", val)}
                    />
                </div>
            </div>
            <div className="grid w-full gap-2">
                <div className="item">
                    <Label>Product Tags</Label>
                    <TagInput
                        defaultTags={data.tags}
                        onTagsChange={(tags) => setData('tags', tags)}
                    />
                </div>
            </div>
            <div className="grid grid-cols-3 w-full gap-2">
                <div className="item">
                    <Label>Unit Type</Label>
                    <AppSelect
                        placeholder="Unit  Type"
                        selected={data.unit}
                        options={[
                            { label: "KG", value: "kg" },
                            { label: "Pieces", value: "pcs" }
                        ]}
                        onChange={(val) => setData("unit", val)}
                    />
                </div>
                <div className="item">
                    <Label>Product Type</Label>
                    <AppSelect
                        placeholder="Product Type"
                        selected={data.product_type}
                        options={[
                            { label: "Simple Product", value: "simple" },
                        ]}
                        onChange={(val) => setData("product_type", val)}
                    />
                </div>
                <div className="item">
                    <Label>Status</Label>
                    <AppSelect
                        placeholder="Select Status"
                        selected={data.status}
                        options={[
                            { label: "Active", value: "active" },
                            { label: "Inactive", value: "inactive" }
                        ]}
                        onChange={(val) => setData("status", val)}
                    />
                </div>
            </div>
        </div>
    )
}

export default ProductForm