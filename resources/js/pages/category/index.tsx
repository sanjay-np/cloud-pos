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
import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

import { CategoryOperation } from "./_components/category-operation";

import { useSheetStore } from "@/hooks/use-sheet";
import { useColumns } from "@/hooks/use-columns";

import { type BreadcrumbItem } from "@/types";
import { CategoryColumnProps, type CategoryIndexProps } from "./_components/category";


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

    const { openSheet } = useSheetStore();
    const { columns, itemId, mode, setMode } = useColumns<CategoryColumnProps>({
        dataKey: "id",
        deleteRoute: "categories.destroy",
        customColumns: [
            {
                accessorKey: "image_url",
                header: "",
                cell: ({ row }) => (
                    <>
                        <Avatar className={`size-16 border-2 border-dashed group-hover:border-primary transition-colors`}>
                            <AvatarImage
                                src={row.getValue("image_url") as string | undefined}
                                alt="Profile picture"
                                className="object-cover"
                            />
                            <AvatarFallback className="text-2xl">{"CP"}</AvatarFallback>
                        </Avatar>
                    </>
                )
            },
            {
                accessorKey: "name",
                header: "Category Name",
                cell: ({ row }) => (
                    <div className="truncate max-w-3xs">{row.getValue("name")}</div>
                ),
            },
            {
                id: "parent",
                header: "Parent Category",
                accessorKey: "parent",
                cell: ({ row }) => {
                    const parent = row.getValue('parent') as any
                    if (parent)
                        return (
                            <div className="capitalize">{parent?.name}</div>
                        )

                    return (
                        <div className="capitalize">-</div>
                    )
                }
            },
            {
                accessorKey: "status",
                header: "Status",
                cell: ({ row }) => {
                    const status = (row.getValue("status") as string) === "active" ? "success" : "error";
                    return (
                        <Badge variant={status} className='capitalize'>
                            {row.getValue("status")}
                        </Badge>
                    )
                },
            },
        ]
    });

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