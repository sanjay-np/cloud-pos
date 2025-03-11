import { Head } from "@inertiajs/react";
import AppTable from "@/components/table/app-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AppLayout from "@/layouts/app-layout";
import { useSheet } from "@/hooks/use-sheet";
import { BreadcrumbItem } from "@/types";

import { CustomerDrawer } from "./_components/customer-drawer";
import { customersPagination } from "./_components/customer";
import { useColumns } from "./_components/use-columns";

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

    const sheetOptions = useSheet()
    const { columns, itemId, setItemId } = useColumns();

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
