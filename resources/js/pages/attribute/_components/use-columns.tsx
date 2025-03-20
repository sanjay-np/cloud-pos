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

import { useSheetStore } from "@/hooks/use-sheet"
import { useAlertStore } from "@/hooks/use-alert";

import { type Mode } from "@/types";
import { type AttributeColumnProps } from "./attribute";
import { Badge } from "@/components/ui/badge";

export const useColumns = () => {

    const [itemId, setItemId] = useState<number | null>(null)
    const [mode, setMode] = useState<Mode>(null)

    const { openSheet } = useSheetStore()
    const { openAlert, closeAlert } = useAlertStore()

    const handleDelete = (attributeId: number) => {
        router.delete(route('attributes.destroy', attributeId), {
            onSuccess: () => {
                closeAlert()
                toast.success('Attribute deleted successfully')
            }
        })
    }

    const triggerDeleteAlert = (id: number): void => {
        openAlert(() => handleDelete(id));
    };

    const columns: ColumnDef<AttributeColumnProps>[] = [
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
            id: "name",
            accessorKey: "name",
            header: "Attribute Name",
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("name")}</div>
            ),
        },
        {
            id: "attributes",
            accessorKey: "attributes",
            header: "Options",
            cell: ({ row }) => {
                const items = row.getValue("attributes") as string[] | null
                return (
                    <div className="flex gap-2">
                        {items && items.map((item, index) => <Badge variant={"outline"} key={index}>{item}</Badge>)}
                    </div>
                )
            }
        },
        {
            id: "status",
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
                const attribute = row.original
                return (
                    <ActionMenu
                        items={[
                            {
                                label: "Edit",
                                icon: Edit,
                                onClick: () => {
                                    setItemId(attribute.id)
                                    setMode("edit")
                                    openSheet()
                                }
                            },
                            {
                                label: "View",
                                icon: Tablet,
                                onClick: () => {
                                    setItemId(attribute.id)
                                    setMode("view")
                                    openSheet()
                                }
                            },
                            {
                                label: "Delete",
                                icon: TrashIcon,
                                onClick: () => {
                                    triggerDeleteAlert(attribute.id)
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
