import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Head, usePage } from "@inertiajs/react";
import { CustomerTable } from "./_components/data-table";
import { CustomerDrawer } from "./_components/customer-drawer";
import { useState } from "react";
import { customersPagination } from "./_components/customer";

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

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Customers" />
            <div className="table-wrapper">
                <CustomerTable
                    data={customers.data}
                    setItemId={setItemId}
                    itemId={itemId}
                />
            </div>
            <CustomerDrawer
                itemId={itemId}
            />
        </AppLayout>
    )
}
export default Index