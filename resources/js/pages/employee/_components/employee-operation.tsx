
import { router, useForm } from "@inertiajs/react"
import { toast } from "sonner"
import { Mode } from "@/types"
import { useState } from "react"
import { EmployeeFormProps, EmployeeResponseProps } from "./employee"
import AppSheet from "@/components/app/app-sheet"
import EmployeeForm from "./employee-form"

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

    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset
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

    const handleSubmit = () => {
        if (mode == "add") {
            post(route('employees.store'), {
                onFinish: () => {
                    toast.success('Employee created successfully')
                }
            })
        }
        if (mode == "edit" && employeeId) {
            router.post(route('employees.update', employeeId), {
                _method: "put",
                ...data
            }, {
                onFinish: () => {
                    toast.success('Employee updated successfully')
                }
            })
        }
    }

    return (
        <AppSheet
            title={drawerTitle}
        >
            {(mode == 'add' || mode == 'edit') && (
                <EmployeeForm
                    data={data}
                    setData={setData}
                    errors={errors}
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