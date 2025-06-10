import { Head } from "@inertiajs/react";

import AppLayout from "@/layouts/app-layout";
import AppTable from "@/components/table/app-table";
import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

import { CustomerOperation } from "./_components/customer-operation";

import { useColumns } from "@/hooks/use-columns";

import { type BreadcrumbItem, } from "@/types";
import { type CustomerColumnProps, type CustomerIndexProps } from "./_components/customer";
import Icon from "@/components/ui/icon";


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

    const { columns, itemId, mode, setMode } = useColumns<CustomerColumnProps>({
        dataKey: "id",
        deleteRoute: "customers.destroy",
        customColumns: [
            {
                id: "customer_name",
                accessorFn: (row) => {
                    return (
                        <div className="flex gap-3 items-center w-[300px]">
                            <div>
                                <Avatar className={`size-14 transition-colors`}>
                                    <AvatarImage
                                        src={row.avatar_url as string | undefined}
                                        alt="Profile picture"
                                        className="object-cover"
                                    />
                                    <AvatarFallback className="text-2xl">
                                        <Icon
                                            name="UserIcon"
                                            weight="duotone"
                                        />
                                    </AvatarFallback>
                                </Avatar>
                            </div>
                            <div className="">
                                <div className="capitalize text-base font-medium">{row.name}</div>
                                <div className="capitalize text-gray-500">{row.phone}</div>
                            </div>
                        </div>
                    )
                },
                header: "Customer",
                cell: (info) => info.getValue()
            },
            {
                id: "email",
                accessorKey: "email",
                header: "Email Address",
                cell: ({ row }) => <div className="lowercase truncate max-w-xs">{row.getValue("email")}</div>,
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
            <AppTable
                data={customers}
                columns={columns}
                pagination={pagination}
                refetch={['customers']}
                setMode={setMode}
                placeholder="Search Customers..."
                searchRoute="customers.index"
            />
            <CustomerOperation customerId={itemId} mode={mode} />
        </AppLayout>
    )
}
export default Index
