import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Head } from "@inertiajs/react";
import { EmployeeTable } from "./_components/data-table";
import { EmployeeDrawer } from "./_components/employee-drawer";

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
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Employees" />
                <EmployeeTable />
            <EmployeeDrawer />
        </AppLayout>
    )
}

export default Index