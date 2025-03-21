import { useState } from "react"
import { ColumnDef } from "@tanstack/react-table"
import {
    Edit,
    Tablet,
    TrashIcon
} from "lucide-react";
import { router } from "@inertiajs/react";
import { toast } from "sonner";

import ActionMenu from "@/components/table/table-action-menu";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

import { useSheetStore } from "@/hooks/use-sheet"
import { useAlertStore } from "@/hooks/use-alert";

import { type Mode } from "@/types";

export const useColumns = () => {

    const [itemId, setItemId] = useState<number | null>(null)
    const [mode, setMode] = useState<Mode>(null)

    const { openSheet } = useSheetStore()
    const { openAlert, closeAlert } = useAlertStore()

    const handleDelete = (productId: number) => {
        router.delete(route('products.destroy', productId), {
            onSuccess: () => {
                closeAlert()
                toast.success('Product deleted successfully')
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
            accessorKey: "image_url",
            header: "",
            cell: ({ row }) => (
                <>
                    <Avatar className={`size-16 border-2 border-dashed group-hover:border-primary transition-colors`}>
                        <AvatarImage
                            src={row.getValue("image_url") as string | undefined}
                            alt="Profile picture"
                            className="object-cover"
                        />
                        <AvatarFallback className="text-2xl">{"PI"}</AvatarFallback>
                    </Avatar>
                </>
            )
        },
        {
            id: "title",
            accessorKey: "title",
            header: "Product Name",
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("title")}</div>
            ),
        },
        {
            id: "stock_qty",
            accessorKey: "stock_qty",
            header: "Stock",
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("stock_qty")}</div>
            ),
        },
        {
            id: "sale_price",
            accessorKey: "sale_price",
            header: "Amount",
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("sale_price")}</div>
            ),
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => {
                const status = (row.getValue("status") as string) === "active" ? "success" : "error";
                return (
                    <Badge variant={status} className='capitalize'>
                        {row.getValue("status")}
                    </Badge>
                )
            },
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