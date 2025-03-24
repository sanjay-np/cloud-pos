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
                            <AvatarFallback className="text-2xl">{"EP"}</AvatarFallback>
                        </Avatar>
                    </>
                )
            },
            {
                id: "name",
                accessorKey: "name",
                header: "Employee Name",
                cell: ({ row }) => (
                    <div className="capitalize">{row.getValue("name")}</div>
                ),
            },
            {
                id: "phone",
                accessorKey: "phone",
                header: "Phone",
                cell: ({ row }) => <div className="lowercase">{row.getValue("phone")}</div>,
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
