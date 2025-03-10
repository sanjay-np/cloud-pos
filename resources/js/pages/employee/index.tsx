import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Head } from "@inertiajs/react";
import { EmployeeTable } from "./_components/data-table";
import { EmployeeDrawer } from "./_components/employee-drawer";
import { useState } from "react";

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

const Index = () => {

    const [itemId, setItemId] = useState<number | null>(null)


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Employees" />
            <div className="table-wrapper">
                <EmployeeTable />
            </div>
            <EmployeeDrawer
                itemId={itemId}
            />
        </AppLayout>
    )
}

export default Index