import { Head } from "@inertiajs/react";
import {
    FileDownIcon,
    ListFilterIcon,
    Settings2Icon
} from "lucide-react";

import AppLayout from "@/layouts/app-layout";
import AppTable from "@/components/table/app-table";
import { Button } from "@/components/ui/button";
import AppSearch from "@/components/app/app-search";

import { CategoryOperation } from "./_components/category-operation";
import { useColumns } from "./_components/use-columns";

import { useSheetStore } from "@/hooks/use-sheet";

import { type BreadcrumbItem } from "@/types";
import { type CategoryIndexProps } from "./_components/category";


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


const Index = ({ categories, parentCategories, pagination }: CategoryIndexProps) => {

    const { columns, itemId, mode, setMode } = useColumns();
    const { openSheet } = useSheetStore();

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Categories" />
            <div className="table-wrapper">
                <div className="flex items-center justify-between py-2 gap-2">
                    <AppSearch
                        placeholder="Search Categories..."
                        searchRoute="brands.index"
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
                    data={categories}
                    columns={columns}
                    pagination={pagination}
                    refetch={['categories']}
                />
            </div>
            <CategoryOperation
                categoryId={itemId}
                mode={mode}
                parents={parentCategories}
            />
        </AppLayout>
    )
}

export default Index