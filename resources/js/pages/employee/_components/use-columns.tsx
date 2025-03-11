import { useState } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { Edit, Tablet, TrashIcon } from "lucide-react";

import ActionMenu from "@/components/table/table-action-menu";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { useSheet } from "@/hooks/use-sheet"

export const useColumns = () => {

    const [itemId, setItemId] = useState<number | null>(null)
    const sheetOptions = useSheet()

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
            accessorKey: "name",
            header: "Employee Name",
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("name")}</div>
            ),
        },
        {
            accessorKey: "phone",
            header: "Phone",
            cell: ({ row }) => <div className="lowercase">{row.getValue("phone")}</div>,
        },
        {
            accessorKey: "department",
            header: "Department",
            cell: ({ row }) => <div className="capitalize">{row.getValue("department")}</div>,
        },
        {
            accessorKey: "position",
            header: "Position",
            cell: ({ row }) => <div className="capitalize">{row.getValue("position")}</div>,
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
                const customer = row.original
                return (
                    <ActionMenu
                        items={[
                            {
                                label: "Edit",
                                icon: Edit,
                                onClick: () => {
                                    setItemId(customer.id)
                                    sheetOptions.onOpen()
                                }
                            },
                            {
                                label: "View",
                                icon: Tablet,
                                onClick: () => { }
                            },
                            {
                                label: "Delete",
                                icon: TrashIcon,
                                onClick: () => { }
                            },
                        ]}
                    />
                )
            },
        },
    ]
    return { itemId, setItemId, columns }
}