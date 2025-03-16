import { Head } from "@inertiajs/react";
import AppTable from "@/components/table/app-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSheetStore } from "@/hooks/use-sheet";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types"
import BrandOperation from "./_components/brand-operation";
import { useColumns } from "./_components/use-columns";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Brands',
        href: '/brands',
    }
]
const Index = ({ brands }: any) => {
    console.log(brands);


    const { columns, itemId, mode, setMode } = useColumns()
    const { openSheet } = useSheetStore();

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Brands" />
            <div className="table-wrapper">
                <div className="flex items-center justify-between py-2 gap-2">
                    <Input placeholder="Search Brands..." />
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
                    data={brands.data}
                    columns={columns}
                    meta={{
                        next_page_url: brands.next_page_url,
                        prev_page_url: brands.prev_page_url,
                    }}
                />
            </div>
            <BrandOperation brandId={itemId} mode={mode} />
        </AppLayout>
    )
}

export default Index