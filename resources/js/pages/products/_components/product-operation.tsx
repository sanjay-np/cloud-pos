import { router, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import AppSheet from "@/components/app/app-sheet";

import { useSheetStore } from "@/hooks/use-sheet";

import { type Mode } from "@/types";
import ProductForm from "./product-form";

type ProductOperationProps = {
    productId: number | null;
    mode: Mode;
}

const ProductOperation = ({ productId, mode }: ProductOperationProps) => {

    const drawerTitle = mode == 'add'
        ? 'Add Product'
        : mode == 'edit'
            ? "Edit Product"
            : 'Product Details'

    const [isProcessing, setIsProcessing] = useState<boolean>(false)
    const [product, setProduct] = useState<any | null>(null)
    const { closeSheet } = useSheetStore()

    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
    } = useForm<Required<any>>({
        title: "",
        description: "",
        main_image: null,
        purchase_price: "",
        sale_price: "",
        stock_qty: "",
        category_ids: [],
        brand_id: "",
        supplier_id: "",
        tags: [],
        product_type: "",
        unit: "",
        status: ""
    })

    useEffect(() => {
        if (!productId) return
        setIsProcessing(true)
        const fetchProduct = async () => {
            try {
                const result = await fetch(route('products.show', productId))
                const response = await result.json()

                if (response) {
                    setProduct(response)
                    setData(response)
                    setIsProcessing(false)
                }
            } catch (err: any) {
                console.log(err);
            } finally {
                setIsProcessing(false)
            }
        }
        fetchProduct()
    }, [productId])

    const handleSubmit = () => {
        if (mode == "add") {
            post(route('products.store'), {
                onSuccess: () => {
                    toast.success('Product created successfully')
                    closeSheet()
                    reset();
                }
            })
        }
        if (mode == "edit" && productId) {
            router.post(route('products.update', productId), {
                _method: "put",
                ...data
            }, {
                onSuccess: () => {
                    toast.success('Product updated successfully')
                    closeSheet()
                    reset();
                }
            })
        }
    }

    return (
        <AppSheet
            title={drawerTitle}
            subTitle="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
            onConfirm={handleSubmit}
            processing={processing}
            width={"sm:max-w-[520px]"}
        >
            {(mode == 'add' || mode == 'edit') && (
                <ProductForm
                    data={data}
                    setData={setData}
                    errors={errors}
                    isProcessing={isProcessing}
                />
            )}
            {mode == 'view' && (
                <div className="grid gap-4 px-4">
                    {(isProcessing && !product) && (
                        <>
                            loading...
                        </>
                    )}
                    {(!isProcessing && product) && (
                        <>
                            {JSON.stringify(product, null, 2)}
                        </>
                    )}
                </div>
            )}
        </AppSheet>
    )
}

export default ProductOperation