
import { useEffect, useState } from "react"
import { router, useForm } from "@inertiajs/react"
import { toast } from "sonner"

import AppSheet from "@/components/app/app-sheet"
import { CategoryForm } from "./category-form"
import { useSheetStore } from "@/hooks/use-sheet"
import { Mode } from "@/types"
import { ParentCategory } from "./category"

type CateoryOperationProps = {
    categoryId: number | null,
    mode: Mode,
    parents: ParentCategory[] | null
}

export const CategoryOperation = ({ categoryId, mode, parents }: CateoryOperationProps) => {

    const drawerTitle = mode == 'add'
        ? 'Add Cateory'
        : mode == 'edit'
            ? "Edit Cateory"
            : 'Cateory Details'

    const [isProcessing, setIsProcessing] = useState<boolean>(false)
    const [category, setCatgory] = useState<any>(null)
    const { closeSheet } = useSheetStore()
    const [parentCategories, setParentCatgories] = useState<any>([])

    const {
        data,
        setData,
        post,
        errors,
        processing,
        reset
    } = useForm<Required<any>>({
        name: "",
        image: null,
        description: "",
        parent_id: "",
        status: ""
    })

    useEffect(() => {
        if (!categoryId) return
        setIsProcessing(true)
        const fetchCustomer = async () => {
            try {
                const result = await fetch(route('categories.show', categoryId))
                const response = await result.json()
                if (response) {
                    setCatgory(response)
                    setData(response)
                    setIsProcessing(false)
                }
            } catch (err: any) {
                console.log(err);
            } finally {
                setIsProcessing(false)
            }

        }
        let filteredCatories = parents?.filter((item) => parseInt(item?.value) != categoryId)
        setParentCatgories(filteredCatories)
        fetchCustomer()
    }, [categoryId])

    const handleSubmit = () => {
        if (mode == 'add') {
            post(route('categories.store'), {
                onSuccess: () => {
                    toast.success('Category created successfully')
                    closeSheet()
                    reset();
                },
            })
        }
        if (mode == 'edit' && categoryId) {
            router.post(route('categories.update', categoryId), {
                _method: 'put',
                ...data
            }, {
                onSuccess: () => {
                    toast.success('Category Updated successfully')
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
                <CategoryForm
                    data={data}
                    setData={setData}
                    errors={errors}
                    isProcessing={isProcessing}
                    parents={parentCategories}
                />
            )}
            {mode == 'view' && (
                <div className="grid gap-4 px-4">
                    {(isProcessing && !category) && (
                        <>
                            loading...
                        </>
                    )}
                    {(!isProcessing && category) && (
                        <>
                            {JSON.stringify(category, null, 2)}
                        </>
                    )}
                </div>
            )}
        </AppSheet>
    )
}
