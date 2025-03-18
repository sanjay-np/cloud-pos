import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Tablet, TrashIcon } from "lucide-react";
import { router } from "@inertiajs/react";
import { toast } from "sonner";

import ActionMenu from "@/components/table/table-action-menu";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@/components/ui/avatar";

import { useSheetStore } from "@/hooks/use-sheet";
import { useAlertStore } from "@/hooks/use-alert";

import { type CustomerColumnProps } from "./customer";
import { type Mode } from "@/types";

export const useColumns = () => {

    const [itemId, setItemId] = useState<number | null>(null);
    const [mode, setMode] = useState<Mode>(null)

    const { openSheet } = useSheetStore()
    const { openAlert, closeAlert } = useAlertStore()

    const handleDelete = (customerId: number) => {
        if (customerId) {
            router.delete(route('customers.destroy', customerId), {
                onSuccess: () => {
                    closeAlert()
                    toast.success('Customer deleted successfully')
                }
            })
        }

    }

    const triggerDeleteAlert = (id: number): void => {
        openAlert(() => handleDelete(id));
    };

    const columns: ColumnDef<CustomerColumnProps>[] = [
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
            id: "avatar_url",
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
                        <AvatarFallback className="text-2xl">{"CP"}</AvatarFallback>
                    </Avatar>
                </>
            )
        },
        {
            id: "name",
            accessorKey: "name",
            header: "Customer Name",
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("name")}</div>
            ),
        },
        {
            id: "email",
            accessorKey: "email",
            header: "Email Address",
            cell: ({ row }) => <div className="lowercase truncate max-w-xs">{row.getValue("email")}</div>,
        },
        {
            id: "phone",
            accessorKey: "phone",
            header: "Phone",
            cell: ({ row }) => <div className="lowercase">{row.getValue("phone")}</div>,
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
                const customer = row.original
                return (
                    <ActionMenu
                        items={[
                            {
                                label: "Edit",
                                icon: Edit,
                                onClick: () => {
                                    setItemId(customer.id)
                                    setMode("edit")
                                    openSheet()
                                }
                            },
                            {
                                label: "View",
                                icon: Tablet,
                                onClick: () => {
                                    setItemId(customer.id)
                                    setMode("view")
                                    openSheet()
                                }
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

    return { itemId, setItemId, mode, setMode, columns }
};
