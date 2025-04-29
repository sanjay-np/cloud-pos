import AppSheet from '@/components/app/app-sheet';
import { useSheetStore } from '@/hooks/use-sheet';
import { Mode } from '@/types';
import { router, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react'
import { toast } from 'sonner';
import BrandForm from './brand-form';

type BrandOperationProps = {
    brandId: number | null;
    mode: Mode
}

const BrandOperation = ({ brandId, mode }: BrandOperationProps) => {

    const drawerTitle = mode == 'add'
        ? 'Add Brand'
        : mode == 'edit'
            ? "Edit Brand"
            : 'Brand Details'

    const [isProcessing, setIsProcessing] = useState<boolean>(false)
    const [brand, setBrand] = useState<any | null>(null)
    const { closeSheet } = useSheetStore()

    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
    } = useForm<Required<any>>({
        name: "",
        phone: "",
        address: "",
        joined_at: null,
        department: "",
        position: "",
        document_type: "",
        document_number: "",
        avatar: null,
        document_files: [],
        status: "",
    })

    useEffect(() => {
        if (!brandId) return
        setIsProcessing(true)
        const fetchBrand = async () => {
            try {
                const result = await fetch(route('brands.show', brandId))
                const response = await result.json()
                if (response) {
                    setBrand(response)
                    setData(response)
                    setIsProcessing(false)
                }
            } catch (err: any) {
                console.log(err);
            } finally {
                setIsProcessing(false)
            }

        }
        fetchBrand()
    }, [brandId])


    const handleSubmit = () => {
        if (mode == "add") {
            post(route('brands.store'), {
                onSuccess: () => {
                    toast.success('Brand created successfully')
                    closeSheet()
                    reset();
                }
            })
        }
        if (mode == "edit" && brandId) {
            router.post(route('brands.update', brandId), {
                _method: "put",
                ...data
            }, {
                onSuccess: () => {
                    toast.success('Brand updated successfully')
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
        >
            {(mode == 'add' || mode == 'edit') && (
                <BrandForm
                    data={data}
                    setData={setData}
                    errors={errors}
                    isProcessing={isProcessing}
                />
            )}
            {mode == 'view' && (
                <div className="grid gap-4 px-4">
                    {(isProcessing && !brand) && (
                        <>
                            loading...
                        </>
                    )}
                    {(!isProcessing && brand) && (
                        <>
                            {JSON.stringify(brand, null, 2)}
                        </>
                    )}
                </div>
            )}
        </AppSheet>
    )
}

export default BrandOperation