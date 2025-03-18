import { Head, WhenVisible } from "@inertiajs/react";
import AppTable from "@/components/table/app-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AppLayout from "@/layouts/app-layout";
import { useSheetStore } from "@/hooks/use-sheet";
import { BreadcrumbItem } from "@/types";

import { useColumns } from "./_components/use-columns";
import { CustomerOperation } from "./_components/customer-operation";

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

const Index = ({ customers, pagination }: any) => {

    const { columns, itemId, mode, setMode } = useColumns();
    const { openSheet } = useSheetStore();

    let reachedEnd = pagination.current_page >= pagination.last_page
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Customers" />
            <div className="table-wrapper">
                <div className="flex items-center justify-between py-2 gap-2">
                    <Input placeholder="Search Customers..." />
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
                    data={customers}
                    columns={columns}
                />
                <WhenVisible
                    fallback={"loading..."}
                    always={!reachedEnd}
                    params={{
                        only: ['customers', 'pagination'],
                        preserveUrl: true,
                        data: {
                            page: pagination.current_page + 1
                        }
                    }}
                >
                    <></>
                </WhenVisible>
            </div>
            <CustomerOperation customerId={itemId} mode={mode} />
        </AppLayout>
    )
}
export default Index
