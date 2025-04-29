import AppSheet from "@/components/app/app-sheet";
import { useSheetStore } from "@/hooks/use-sheet";
import { type Mode } from "@/types";
import { router, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import ExpenseForm from "./expense-form";

type ExpenseOperationProps = {
    expenseId: number | null;
    mode: Mode;
}

const ExpenseOperation = ({ expenseId, mode }: ExpenseOperationProps) => {
    const drawerTitle = mode == 'add'
        ? 'Add Expense'
        : mode == 'edit'
            ? "Edit Expense"
            : 'Expense Details'

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

    useEffect(() => {
        if (!expenseId) return
        setIsProcessing(true)
        const fetchExpense = async () => {
            try {
                const result = await fetch(route('expenses.show', expenseId))
                const response = await result.json()
                if (response) {
                    setExpense(response)
                    setData(response)
                    setIsProcessing(false)
                }
            } catch (err: any) {
                console.log(err);
            } finally {
                setIsProcessing(false)
            }

        }
        fetchExpense()
    }, [expenseId])

    const handleSubmit = () => {
        if (mode == "add") {
            post(route('expenses.store'), {
                onSuccess: () => {
                    toast.success('Expense created successfully')
                    closeSheet()
                    reset();
                }
            })
        }
        if (mode == "edit" && expenseId) {
            router.post(route('expenses.update', expenseId), {
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
        >
            {(mode == 'add' || mode == 'edit') && (
                <ExpenseForm
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

export default ExpenseOperation