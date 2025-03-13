
import { router, useForm } from "@inertiajs/react"
import { toast } from "sonner"

import AppSheet from "@/components/app/app-sheet"
import CustomerForm from "./customer-form"
import { CustomerFormProps, CustomerResponseProps } from "./customer"
import { useEffect, useState } from "react"

type CustomerOperationProps = {
    customerId: number | null,
    mode: "add" | "edit" | "view" | null
}

export const CustomerOperation = ({ customerId, mode }: CustomerOperationProps) => {

    const drawerTitle = mode == 'add'
        ? 'Add Customer'
        : mode == 'edit'
            ? "Edit Customer"
            : 'Customer Details'

    const [isProcessing, setIsProcessing] = useState<boolean>(false)
    const [customer, setCustomer] = useState<CustomerResponseProps | null>(null)

    useEffect(() => {
        if (!customerId) return
        setIsProcessing(true)
        const fetchCustomer = async () => {
            try {
                const result = await fetch(route('customers.show', customerId))
                const response = await result.json()
                if (response) {
                    setCustomer(response)
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

    const {
        data,
        setData,
        post,
        errors,
        processing
    } = useForm<Required<CustomerFormProps>>({
        name: "",
        phone: "",
        email: "",
        address: "",
        whatsapp: "",
        status: "",
        avatar: null,
    })

    const handleSubmit = () => {
        if (mode == 'add') {
            post(route('customers.store'), {
                onSuccess: () => {
                    toast.success('Customer created successfully')
                },
                onFinish: () => {
                }
            })
        }
        if (mode == 'edit') {
            router.post(route('customers.update'), {
                _method: 'put',
                ...data
            }, {
                onSuccess: () => {
                    toast.success('Customer Updated successfully')
                }
            })
        }
    }

    return (
        <AppSheet
            title={drawerTitle}
            subTitle="Make changes to your profile here. Click save when you're done."
            onConfirm={handleSubmit}
        >
            {(mode == 'add' || mode == 'edit') && (
                <CustomerForm
                    data={data}
                    setData={setData}
                    errors={errors}
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
