import AppTable from "@/components/table/app-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSheetStore } from "@/hooks/use-sheet";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Head } from "@inertiajs/react";
import { CategoryOperation } from "./_components/category-operation";
import { useColumns } from "./_components/use-columns";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Categories',
        href: '/categories',
    }
];


const Index = ({ categories }: any) => {

    const { columns, itemId, mode, setMode } = useColumns();
    const { openSheet } = useSheetStore();

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Categories" />
            <div className="table-wrapper">
                <div className="flex items-center justify-between py-2 gap-2">
                    <Input placeholder="Search Categories..." />
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
                    data={categories.data}
                    columns={columns}
                    meta={{
                        next_page_url: categories.next_page_url,
                        prev_page_url: categories.prev_page_url,
                    }}
                />
            </div>
            <CategoryOperation categoryId={itemId} mode={mode} />
        </AppLayout>
    )
}

export default Index