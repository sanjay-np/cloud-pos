import { Head } from "@inertiajs/react";
import {
    FileDownIcon,
    ListFilterIcon,
    Settings2Icon
} from "lucide-react";

import AppLayout from "@/layouts/app-layout";
import AppTable from "@/components/table/app-table";
import { Button } from "@/components/ui/button";
import AppSearch from "@/components/app/app-search";
import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

import { CustomerOperation } from "./_components/customer-operation";

import { useSheetStore } from "@/hooks/use-sheet";
import { useColumns } from "@/hooks/use-columns";

import { type BreadcrumbItem, } from "@/types";
import { type CustomerColumnProps, type CustomerIndexProps } from "./_components/customer";


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

const Index = ({ customers, pagination }: CustomerIndexProps) => {

    const { openSheet } = useSheetStore();
    const { columns, itemId, mode, setMode } = useColumns<CustomerColumnProps>({
        dataKey: "id",
        deleteRoute: "customers.destroy",
        customColumns: [
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
            }
        ]
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Customers" />
            <div className="table-wrapper">
                <div className="flex items-center justify-between py-2 gap-2">
                    <AppSearch
                        placeholder="Search Customers..."
                        searchRoute="customers.index"
                    />
                    <div className="flex gap-2">
                        <Button variant={'outline'}>
                            <ListFilterIcon />
                        </Button>
                        <Button variant={'outline'}>
                            <Settings2Icon />
                        </Button>
                        <Button variant={'outline'}>
                            <FileDownIcon />
                        </Button>
                        <Button
                            variant="default"
                            className="ml-auto"
                            onClick={() => {
                                setMode("add")
                                openSheet()
                            }}
                        >
                            Add New
                        </Button>
                    </div>
                </div>
                <AppTable
                    data={customers}
                    columns={columns}
                    pagination={pagination}
                    refetch={['customers']}
                />
            </div>
            <CustomerOperation customerId={itemId} mode={mode} />
        </AppLayout>
    )
}
export default Index
