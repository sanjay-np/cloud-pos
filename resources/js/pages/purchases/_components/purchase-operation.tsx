import { router, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import AppSheet from '@/components/app/app-sheet';
import PurchaseForm from './purchase-form';

import { useSheetStore } from '@/hooks/use-sheet';
import { type Mode } from '@/types';
import { PurchaseFormFieldProps } from './purchase';

type PurchaseOperationProps = {
    purchaseId: number | null;
    mode: Mode
}

const PurchaseOperation = ({ purchaseId, mode }: PurchaseOperationProps) => {

    const drawerTitle = mode == 'add'
        ? 'Add Purchase'
        : mode == 'edit'
            ? "Edit Purchase"
            : 'Purchase Details'

    const [isProcessing, setIsProcessing] = useState<boolean>(false)
    const [purchase, setPurchase] = useState<any | null>(null)
    const { closeSheet } = useSheetStore()

    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
    } = useForm<Required<PurchaseFormFieldProps>>({
        date: "",
        products: [],
        supplier_id: "",
        tax_percentage: 0,
        tax_amount: 0,
        discount_amount: 0,
        shipping_amount: 0,
        total_amount: 0,
        paid_amount: 0,
        due_amount: 0,
        status: "",
        payment_status: "",
        payment_method: "",
        note: "",
    })

    const handleSubmit = () => {
        if (mode == "add") {
            post(route('purchases.store'), {
                onSuccess: () => {
                    toast.success('Purchase created successfully')
                    closeSheet()
                    reset();
                }
            })
        }
        if (mode == "edit" && purchaseId) {
            router.post(route('purchases.update', purchaseId), {
                _method: "put",
                ...data
            }, {
                onSuccess: () => {
                    toast.success('Purchase updated successfully')
                    closeSheet()
                    reset();
                }
            })
        }
    }

    useEffect(() => {
        if (!purchaseId) return

        setIsProcessing(true)
        const fetchPurchase = async () => {
            try {
                const result = await fetch(route('purchases.show', purchaseId))
                const response = await result.json()

                console.log(response);

                if (response) {
                    setPurchase(response)
                    setData(response)
                    setIsProcessing(false)
                }

            } catch (err: any) {
                console.log(err);
            } finally {
                setIsProcessing(false)
            }
        }
        fetchPurchase()

    }, [purchaseId])

    return (
        <AppSheet
            title={drawerTitle}
            subTitle="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
            onConfirm={handleSubmit}
            processing={processing}
            width={"sm:max-w-[720px]"}
        >
            {(mode == 'add' || mode == 'edit') && (
                <PurchaseForm
                    data={data}
                    setData={setData}
                    errors={errors}
                    isProcessing={isProcessing}
                />
            )}
            {mode == 'view' && (
                <div className="grid gap-4 px-4">
                    {(isProcessing && !purchase) && (
                        <>
                            loading...
                        </>
                    )}
                    {(!isProcessing && purchase) && (
                        <>
                            {JSON.stringify(purchase, null, 2)}
                        </>
                    )}
                </div>
            )}
        </AppSheet>
    )
}

export default PurchaseOperation