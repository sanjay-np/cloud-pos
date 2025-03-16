import { useState } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { Edit, Tablet, TrashIcon } from "lucide-react";
import { router } from "@inertiajs/react";
import { toast } from "sonner";

import ActionMenu from "@/components/table/table-action-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { useSheetStore } from "@/hooks/use-sheet"
import { useAlertStore } from "@/hooks/use-alert";
import { Mode } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


export const useColumns = () => {

    const [itemId, setItemId] = useState<number | null>(null)
    const [mode, setMode] = useState<Mode>(null)
    const { openSheet } = useSheetStore()
    const { openAlert, closeAlert } = useAlertStore()

    const handleDelete = (supplierId: number) => {
        router.delete(route('suppliers.destroy', supplierId), {
            onSuccess: () => {
                closeAlert()
                toast.success('Supplier deleted successfully')
            }
        })
    }

    const triggerDeleteAlert = (id: number): void => {
        openAlert(() => handleDelete(id));
    };

    const columns: ColumnDef<any>[] = [
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "avatar_url",
            header: "",
            cell: ({ row }) => (
                <>
                    <Avatar className={`size-16 border-2 border-dashed group-hover:border-primary transition-colors`}>
                        <AvatarImage
                            src={row.getValue("avatar_url") as string | undefined}
                            alt="Profile picture"
                            className="object-cover"
                        />
                        <AvatarFallback className="text-2xl">{"EP"}</AvatarFallback>
                    </Avatar>
                </>
            )
        },
        {
            accessorKey: "name",
            header: "Supplier Name",
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("name")}</div>
            ),
        },
        {
            accessorKey: "phone",
            header: "Contact",
            cell: ({ row }) => <div className="lowercase">{row.getValue("phone")}</div>,
        },
        {
            accessorKey: "department",
            header: "Contact Person",
            cell: ({ row }) => <div className="capitalize">{row.getValue("department")}</div>,
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
                const supplier = row.original
                return (
                    <ActionMenu
                        items={[
                            {
                                label: "Edit",
                                icon: Edit,
                                onClick: () => {
                                    setItemId(supplier.id)
                                    setMode("edit")
                                    openSheet()
                                }
                            },
                            {
                                label: "View",
                                icon: Tablet,
                                onClick: () => {
                                    setItemId(supplier.id)
                                    setMode("view")
                                    openSheet()
                                }
                            },
                            {
                                label: "Delete",
                                icon: TrashIcon,
                                onClick: () => {
                                    triggerDeleteAlert(supplier.id)
                                }
                            },
                        ]}
                    />
                )
            },
        },
    ]
    return { itemId, setItemId, mode, setMode, columns }
}