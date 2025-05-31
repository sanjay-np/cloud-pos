import { Head } from "@inertiajs/react";

import AppLayout from "@/layouts/app-layout";
import AppTable from "@/components/table/app-table";
import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

import { CategoryOperation } from "./_components/category-operation";

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

    const { columns, itemId, mode, setMode } = useColumns<CategoryColumnProps>({
        dataKey: "id",
        deleteRoute: "categories.destroy",
        customColumns: [
            {
                id: "category",
                header: "Category",
                accessorFn: (row) => (
                    <div className="flex gap-3 items-center w-[300px]">
                        <div>
                            <Avatar className={`size-16 transition-colors`}>
                                <AvatarImage
                                    src={row.image_url as string | undefined}
                                    alt="Profile picture"
                                    className="object-cover"
                                />
                                <AvatarFallback className="text-2xl">{"CP"}</AvatarFallback>
                            </Avatar>
                        </div>
                        <div className="">
                            <div className="capitalize text-md ">{row.name}</div>
                        </div>
                    </div>
                ),
                cell: (info) => info.getValue()
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
            <AppTable
                data={categories}
                columns={columns}
                pagination={pagination}
                refetch={['categories']}
                placeholder="Search Categories..."
                searchRoute="brands.index"
                setMode={setMode}
            />
            <CategoryOperation categoryId={itemId} mode={mode} parents={parentCategories} />
        </AppLayout>
    )
}

export default Index
