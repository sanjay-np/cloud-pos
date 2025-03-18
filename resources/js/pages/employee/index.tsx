import { Head } from "@inertiajs/react";
import {
    FileDownIcon,
    ListFilterIcon,
    Settings2Icon
} from "lucide-react";

import AppLayout from "@/layouts/app-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AppTable from "@/components/table/app-table";

import { EmployeeOperation } from "./_components/employee-operation";
import { useColumns } from "./_components/use-columns";

import { useSheetStore } from "@/hooks/use-sheet";
import { type BreadcrumbItem } from "@/types";
import { type EmployeePageProps } from "./_components/employee";
import AppSearch from "@/components/app/app-search";

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

const Index = ({ employees, pagination }: EmployeePageProps) => {

    const { columns, itemId, mode, setMode } = useColumns()
    const { openSheet } = useSheetStore();

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Employees" />
            <div className="table-wrapper">
                <div className="flex items-center justify-between py-2 gap-2">
                    <AppSearch
                        placeholder="Search Employees..."
                        searchRoute="employees.index"
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
                    data={employees}
                    columns={columns}
                    pagination={pagination}
                    refetch={['employees']}
                />
            </div>
            <EmployeeOperation employeeId={itemId} mode={mode} />
        </AppLayout>
    )
}

export default Index
