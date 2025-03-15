
import { useEffect, useState } from "react"
import { router, useForm } from "@inertiajs/react"
import { toast } from "sonner"

import AppSheet from "@/components/app/app-sheet"
import CustomerForm from "./customer-form"
import { CustomerFormProps, CustomerResponseProps } from "./customer"
import { Mode } from "@/types"
import { useSheetStore } from "@/hooks/use-sheet"

type CustomerOperationProps = {
    customerId: number | null,
    mode: Mode
}

export const CustomerOperation = ({ customerId, mode }: CustomerOperationProps) => {

    const drawerTitle = mode == 'add'
        ? 'Add Customer'
        : mode == 'edit'
            ? "Edit Customer"
            : 'Customer Details'

    const [isProcessing, setIsProcessing] = useState<boolean>(false)
    const [customer, setCustomer] = useState<CustomerResponseProps | null>(null)
    const { closeSheet } = useSheetStore()

    const {
        data,
        setData,
        post,
        errors,
        processing,
        reset
    } = useForm<Required<CustomerFormProps>>({
        name: "",
        phone: "",
        email: "",
        address: "",
        whatsapp: "",
        status: "",
        avatar: null,
    })

    useEffect(() => {
        if (!customerId) return
        setIsProcessing(true)
        const fetchCustomer = async () => {
            try {
                const result = await fetch(route('customers.show', customerId))
                const response = await result.json()
                if (response) {
                    setCustomer(response)
                    setData(response)
                    setIsProcessing(false)
                }
            } catch (err: any) {
                console.log(err);
            } finally {
                setIsProcessing(false)
            }

        }
        fetchCustomer()
    }, [customerId])

    const handleSubmit = () => {
        if (mode == 'add') {
            post(route('customers.store'), {
                onSuccess: () => {
                    toast.success('Customer created successfully')
                    closeSheet()
                    reset();
                },
            })
        }
        if (mode == 'edit' && customerId) {
            router.post(route('customers.update', customerId), {
                _method: 'put',
                ...data
            }, {
                onSuccess: () => {
                    toast.success('Customer Updated successfully')
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
            processing={processing}
        >
            {(mode == 'add' || mode == 'edit') && (
                <CustomerForm
                    data={data}
                    setData={setData}
                    errors={errors}
                    isProcessing={isProcessing}
                />
            )}
            {mode == 'view' && (
                <div className="grid gap-4 px-4">
                    {(isProcessing && !customer) && (
                        <>
                            loading...
                        </>
                    )}
                    {(!isProcessing && customer) && (
                        <>
                            {JSON.stringify(customer, null, 2)}
                        </>
                    )}
                </div>
            )}
        </AppSheet>
    )
}
