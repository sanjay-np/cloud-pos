import { Head } from "@inertiajs/react";
import { format } from "date-fns";

import AppLayout from "@/layouts/app-layout";
import AppTable from "@/components/table/app-table";
import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

import { EmployeeOperation } from "./_components/employee-operation";

import { useColumns } from "@/hooks/use-columns";

import { type BreadcrumbItem } from "@/types";
import { type EmployeeColumnProps, type EmployeeIndexProps } from "./_components/employee";
import Icon from "@/components/ui/icon";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Employees',
        href: '/employees',
    }
];

const Index = ({ employees, pagination }: EmployeeIndexProps) => {

    const { columns, itemId, mode, setMode } = useColumns<EmployeeColumnProps>({
        dataKey: "id",
        deleteRoute: "",
        customColumns: [
            {
                id: "employee_name",
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
                                <div className="capitalize text-md ">{row.name}</div>
                                <div className="capitalize text-gray-500">{row.phone}</div>
                            </div>
                        </div>
                    )
                },
                header: "Employee",
                cell: (info) => info.getValue()
            },
            {
                id: "department",
                accessorKey: "department",
                header: "Department",
                cell: ({ row }) => <div className="capitalize">{row.getValue("department")}</div>,
            },
            {
                id: "position",
                accessorKey: "position",
                header: "Position",
                cell: ({ row }) => <div className="capitalize">{row.getValue("position")}</div>,
            },
            {
                id: "joined_at",
                accessorKey: "joined_at",
                header: "Joined At",
                cell: ({ row }) => <div className="capitalize">{format(row.getValue("joined_at"), 'PPP')}</div>,
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
        ]
    })

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Employees" />
            <AppTable
                data={employees}
                columns={columns}
                pagination={pagination}
                refetch={['employees']}
                searchRoute="employees.index"
                setMode={setMode}
                placeholder="Search Employees..."
            />
            <EmployeeOperation employeeId={itemId} mode={mode} />
        </AppLayout>
    )
}

export default Index
