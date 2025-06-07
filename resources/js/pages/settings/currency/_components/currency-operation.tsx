import AppSheet from "@/components/app/app-sheet"
import { useSheetStore } from "@/hooks/use-sheet"
import { type Mode } from "@/types"
import { useEffect, useState } from "react"
import CurrencyForm from "./currency-form"
import { router, useForm } from "@inertiajs/react"
import { toast } from "sonner"

type CurrencyOperationProps = {
    currencyId: number | null,
    mode: Mode
}


const CurrencyOperation = ({ currencyId, mode }: CurrencyOperationProps) => {

    const drawerTitle = mode == 'add'
        ? 'Add Currency'
        : mode == 'edit'
            ? "Edit Currency"
            : 'Currency Details'

    const [isProcessing, setIsProcessing] = useState<boolean>(false)
    const [currency, setCurrency] = useState<any>(null)
    const { closeSheet } = useSheetStore()

    const { data, setData, post, errors, reset } = useForm({
        name: "",
        label: "",
        is_current: false
    })

    useEffect(() => {
        if (!currencyId) return
        setIsProcessing(true)
        const fetchCurrency = async () => {
            try {
                const result = await fetch(route('currency.show', currencyId))
                const response = await result.json()
                if (response) {
                    setCurrency(response)
                    setData(response)
                    setIsProcessing(false)
                }
            } catch (err: any) {
                console.log(err);
            } finally {
                setIsProcessing(false)
            }

        }
        fetchCurrency()
    }, [currencyId])
    console.log(currency)

    const handleSubmit = () => {

        if (mode == 'add') {
            post(route('currency.store'), {
                onSuccess: () => {
                    toast.success('Currency created successfully')
                    closeSheet()
                    reset();
                },
            })
        }
        if (mode == 'edit' && currencyId) {
            router.post(route('currency.update', currencyId), {
                _method: 'put',
                ...data
            }, {
                onSuccess: () => {
                    toast.success('Currency Updated successfully')
                    closeSheet()
                    reset()
                }
            })
        }
    }

    return (
        <AppSheet
            title={drawerTitle}
            subTitle="Make changes to your profile here. Click save when you're done."
            onConfirm={handleSubmit}
            processing={isProcessing}
        >
            {(mode == 'add' || mode == 'edit') && (
                <CurrencyForm
                    data={data}
                    setData={setData}
                    errors={errors}
                    isProcessing={isProcessing}
                />
            )}
            {mode == 'view' && (
                <div className="grid gap-4 px-4">
                    {(isProcessing && !currency) && (
                        <>
                            loading...
                        </>
                    )}
                    {(!isProcessing && currency) && (
                        <>
                            {JSON.stringify(currency, null, 2)}
                        </>
                    )}
                </div>
            )}
        </AppSheet>
    )
}

export default CurrencyOperation
