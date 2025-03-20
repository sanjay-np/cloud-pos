import { router, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import AppSheet from "@/components/app/app-sheet";
import AttributeForm from "./attribute-form";

import { useSheetStore } from "@/hooks/use-sheet";

import { type Mode } from "@/types";

type AttributeOperationProps = {
    attributeId: number | null;
    mode: Mode;
}


const AttributeOperation = ({ attributeId, mode }: AttributeOperationProps) => {

    const drawerTitle = mode == 'add'
        ? 'Add Attribute'
        : mode == 'edit'
            ? "Edit Attribute"
            : 'Attribute Details'

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
        description: "",
        attributes: [],
        status: ""
    })

    const handleSubmit = () => {
        if (mode == "add") {
            post(route('attributes.store'), {
                onSuccess: () => {
                    toast.success('Supplier created successfully')
                    closeSheet()
                    reset();
                }
            })
        }
        if (mode == "edit" && attributeId) {
            router.post(route('attributes.update', attributeId), {
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

    useEffect(() => {
        if (!attributeId) return
        setIsProcessing(true)
        const fetchSupplier = async () => {
            try {
                const result = await fetch(route('attributes.show', attributeId))
                const response = await result.json()
                console.log(response);

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
    }, [attributeId])

    return (
        <AppSheet
            title={drawerTitle}
            subTitle="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
            onConfirm={handleSubmit}
            processing={processing}
        >
            {(mode == 'add' || mode == 'edit') && (
                <AttributeForm
                    data={data}
                    setData={setData}
                    errors={errors}
                    isProcessing={isProcessing}
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

export default AttributeOperation