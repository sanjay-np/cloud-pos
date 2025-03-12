import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Tablet, TrashIcon } from "lucide-react";

import ActionMenu from "@/components/table/table-action-menu";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { useSheetStore } from "@/hooks/use-sheet";
import { customer } from "./customer";
import { useAlertStore } from "@/hooks/use-alert";

export const useColumns = () => {

    const [itemId, setItemId] = useState<number | null>(null);
    const { openSheet } = useSheetStore()
    const { openAlert, closeAlert } = useAlertStore()

    const handleDelete = (customerId: number) => {
        console.log(customerId);
        // closeAlert()

    }

    const triggerDeleteAlert = (id: number): void => {
        openAlert(() => handleDelete(id));
    };

    // const onDelete = async (customerId: number) => {
    //     if (customerId) {
    //         console.log('Deleting customer with ID:', customerId);
    //         await new Promise((resolve) => setTimeout(resolve, 1000));
    //         console.log('Customer deleted');
    //     } else {
    //         console.error('No customer ID provided for deletion.');
    //     }
    // };


    const columns: ColumnDef<customer>[] = [
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
            header: "Customer Name",
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("name")}</div>
            ),
        },
        {
            accessorKey: "email",
            header: "Email Address",
            cell: ({ row }) => <div className="lowercase truncate max-w-xs">{row.getValue("email")}</div>,
        },
        {
            accessorKey: "phone",
            header: "Phone",
            cell: ({ row }) => <div className="lowercase">{row.getValue("phone")}</div>,
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
                                    openSheet()
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
                                onClick: () => {
                                    triggerDeleteAlert(customer.id)
                                }
                            }
                        ]}
                    />
                )
            },
        },
    ]

    return { itemId, setItemId, columns }
};
