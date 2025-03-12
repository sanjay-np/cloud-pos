import { Head } from "@inertiajs/react";
import AppTable from "@/components/table/app-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AppLayout from "@/layouts/app-layout";
import { useSheetStore } from "@/hooks/use-sheet";
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

    const { columns, itemId } = useColumns();
    const { openSheet } = useSheetStore();

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Customers" />
            <div className="table-wrapper">
                <div className="flex items-center justify-between py-2 gap-2">
                    <Input placeholder="Search Customers..." />
                    <Button
                        variant="outline"
                        className="ml-auto"
                        onClick={openSheet}
                    >
                        Add New
                    </Button>
                </div>
                <AppTable
                    data={customers.data}
                    columns={columns}
                    meta={{
                        next_page_url: customers.next_page_url,
                        prev_page_url: customers.prev_page_url,
                    }}
                />
            </div>
            <CustomerDrawer itemId={itemId} />
        </AppLayout>
    )
}
export default Index
