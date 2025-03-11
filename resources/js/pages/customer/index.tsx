import { Head } from "@inertiajs/react";
import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Tablet, TrashIcon } from "lucide-react";

import AppTable from "@/components/table/app-table";
import ActionMenu from "@/components/table/table-action-menu";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import AppLayout from "@/layouts/app-layout";
import { cn } from "@/lib/utils";
import { useSheet } from "@/hooks/use-sheet";
import { CustomerDrawer } from "./_components/customer-drawer";
import { customer, customersPagination } from "./_components/customer";
import { BreadcrumbItem } from "@/types";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Customers',
        href: '/customers',
    }
];

const Index = ({ customers }: { customers: customersPagination }) => {

    const [itemId, setItemId] = useState<number | null>(null)
    const sheetOptions = useSheet()

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
                    <Badge
                        variant={status}
                        className={cn(`capitalize`)}
                    >
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

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Customers" />
            <div className="table-wrapper">
                <div className="flex items-center justify-between py-4 gap-2">
                    <Input placeholder="Search Customers..." />
                    <Button
                        variant="outline"
                        className="ml-auto"
                        onClick={sheetOptions.onOpen}
                    >
                        Add New
                    </Button>
                </div>
                <AppTable
                    data={customers.data}
                    columns={columns}
                />
            </div>
            <CustomerDrawer itemId={itemId} />
        </AppLayout>
    )
}
export default Index