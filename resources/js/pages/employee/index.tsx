import { Head } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { useSheetStore } from "@/hooks/use-sheet";
import { useColumns } from "./_components/use-columns";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AppTable from "@/components/table/app-table";
import { EmployeeOperation } from "./_components/employee-operation";
import { PaginatiedEmployeeProps } from "./_components/employee";

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

const Index = ({ employees }: { employees: PaginatiedEmployeeProps }) => {

    const { columns, itemId, mode, setMode } = useColumns()
    const { openSheet } = useSheetStore();

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Employees" />
            <div className="table-wrapper">
                <div className="flex items-center justify-between py-2 gap-2">
                    <Input placeholder="Search Employees..." />
                    <Button
                        variant="outline"
                        className="ml-auto"
                        onClick={() => {
                            setMode("add")
                            openSheet()
                        }}
                    >
                        Add New
                    </Button>
                </div>
                <AppTable
                    data={employees.data}
                    columns={columns}
                    meta={{
                        next_page_url: employees.next_page_url,
                        prev_page_url: employees.prev_page_url,
                    }}
                />
            </div>
            <EmployeeOperation employeeId={itemId} mode={mode} />
        </AppLayout>
    )
}

export default Index
