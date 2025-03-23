import { router, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from 'sonner';

import AppSheet from '@/components/app/app-sheet';
import PurchaseForm from './purchase-form';

import { useSheetStore } from '@/hooks/use-sheet';
import { type Mode } from '@/types';

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
    const [expense, setExpense] = useState<any | null>(null)
    const { closeSheet } = useSheetStore()

    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
    } = useForm<Required<any>>({
        date: "",
        title: "",
        amount: "",
        description: ""
    })

    const handleSubmit = () => {
        if (mode == "add") {
            post(route('purchase.store'), {
                onSuccess: () => {
                    toast.success('Expense created successfully')
                    closeSheet()
                    reset();
                }
            })
        }
        if (mode == "edit" && purchaseId) {
            router.post(route('expenses.update', purchaseId), {
                _method: "put",
                ...data
            }, {
                onSuccess: () => {
                    toast.success('Expense updated successfully')
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
                    {(isProcessing && !expense) && (
                        <>
                            loading...
                        </>
                    )}
                    {(!isProcessing && expense) && (
                        <>
                            {JSON.stringify(expense, null, 2)}
                        </>
                    )}
                </div>
            )}
        </AppSheet>
    )
}

export default PurchaseOperation