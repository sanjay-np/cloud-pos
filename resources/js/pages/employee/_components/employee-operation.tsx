
import { router, useForm } from "@inertiajs/react"
import { toast } from "sonner"
import { Mode } from "@/types"
import { useEffect, useState } from "react"
import { EmployeeFormProps, EmployeeResponseProps } from "./employee"
import AppSheet from "@/components/app/app-sheet"
import EmployeeForm from "./employee-form"
import { useSheetStore } from "@/hooks/use-sheet"

type EmployeeOperationProps = {
    employeeId: number | null,
    mode: Mode
}

export function EmployeeOperation({ employeeId, mode }: EmployeeOperationProps) {

    const drawerTitle = mode == 'add'
        ? 'Add Employee'
        : mode == 'edit'
            ? "Edit Employee"
            : 'Employee Details'

    const [isProcessing, setIsProcessing] = useState<boolean>(false)
    const [employee, setEmployee] = useState<EmployeeResponseProps | null>(null)
    const { closeSheet } = useSheetStore()

    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
    } = useForm<Required<EmployeeFormProps>>({
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
        if (!employeeId) return
        setIsProcessing(true)
        const fetchEmployee = async () => {
            try {
                const result = await fetch(route('employees.show', employeeId))
                const response = await result.json()
                if (response) {
                    setEmployee(response)
                    setData(response)
                    setIsProcessing(false)
                }
            } catch (err: any) {
                console.log(err);
            } finally {
                setIsProcessing(false)
            }

        }
        fetchEmployee()
    }, [employeeId])


    const handleSubmit = () => {
        if (mode == "add") {
            post(route('employees.store'), {
                onSuccess: () => {
                    toast.success('Employee created successfully')
                    closeSheet()
                    reset();
                }
            })
        }
        if (mode == "edit" && employeeId) {
            router.post(route('employees.update', employeeId), {
                _method: "put",
                ...data
            }, {
                onSuccess: () => {
                    toast.success('Employee updated successfully')
                    closeSheet()
                    reset();
                }
            })
        }
    }

    return (
        <AppSheet
            title={drawerTitle}
            subTitle="Employee"
            onConfirm={handleSubmit}
            processing={processing}
        >
            {(mode == 'add' || mode == 'edit') && (
                <EmployeeForm
                    data={data}
                    setData={setData}
                    errors={errors}
                    isProcessing={isProcessing}
                />
            )}
            {mode == 'view' && (
                <div className="grid gap-4 px-4">
                    {(isProcessing && !employee) && (
                        <>
                            loading...
                        </>
                    )}
                    {(!isProcessing && employee) && (
                        <>
                            {JSON.stringify(employee, null, 2)}
                        </>
                    )}
                </div>
            )}

        </AppSheet>
    )
}