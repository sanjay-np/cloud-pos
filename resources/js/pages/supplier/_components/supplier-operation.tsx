import { router, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import AppSheet from "@/components/app/app-sheet";
import SupplierForm from "./supplier-form";

import { useSheetStore } from "@/hooks/use-sheet";

import { type Mode } from "@/types";
import { type Brand } from "./supplier";

type SupplierOperationProps = {
    supplierId: number | null;
    mode: Mode;
    brands: Brand[] | null;
}

const SupplierOperation = ({ supplierId, mode, brands }: SupplierOperationProps) => {

    const drawerTitle = mode == 'add'
        ? 'Add Supplier'
        : mode == 'edit'
            ? "Edit Supplier"
            : 'Supplier Details'

    const [isProcessing, setIsProcessing] = useState<boolean>(false)
    const [supplier, setSupplier] = useState<any | null>(null)
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
        pan: "",
        contact_person: "",
        brands: []
    })

    useEffect(() => {
        if (!supplierId) return
        setIsProcessing(true)
        const fetchSupplier = async () => {
            try {
                const result = await fetch(route('suppliers.show', supplierId))
                const response = await result.json()

                if (response) {
                    setSupplier(response)
                    setData(response)
                    setIsProcessing(false)
                }
            } catch (err: any) {
                console.log(err);
            } finally {
                setIsProcessing(false)
            }
        }
        fetchSupplier()
    }, [supplierId])

    const handleSubmit = () => {
        if (mode == "add") {
            post(route('suppliers.store'), {
                onSuccess: () => {
                    toast.success('Supplier created successfully')
                    closeSheet()
                    reset();
                }
            })
        }
        if (mode == "edit" && supplierId) {
            router.post(route('suppliers.update', supplierId), {
                _method: "put",
                ...data
            }, {
                onSuccess: () => {
                    toast.success('Supplier updated successfully')
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
                <SupplierForm
                    data={data}
                    setData={setData}
                    errors={errors}
                    isProcessing={isProcessing}
                    brands={brands}
                />
            )}
            {mode == 'view' && (
                <div className="grid gap-4 px-4">
                    {(isProcessing && !supplier) && (
                        <>
                            loading...
                        </>
                    )}
                    {(!isProcessing && supplier) && (
                        <>
                            {JSON.stringify(supplier, null, 2)}
                        </>
                    )}
                </div>
            )}
        </AppSheet>
    )
}

export default SupplierOperation