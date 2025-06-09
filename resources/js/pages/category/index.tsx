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
import Icon from "@/components/ui/icon";


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
                    <div className="flex gap-3 items-center">
                        <div>
                            <Avatar className={`size-14 transition-colors`}>
                                <AvatarImage
                                    src={row.image_url as string | undefined}
                                    alt="Profile picture"
                                    className="object-cover"
                                />
                                <AvatarFallback className="text-2xl">
                                    <Icon
                                        name="FolderIcon"
                                        weight="duotone"
                                    />
                                </AvatarFallback>
                            </Avatar>
                        </div>
                        <div className="flex flex-col">
                            <div className="capitalize text-base font-medium">{row.name}</div>
                            <p className="text-muted-foreground">{row.description}</p>
                        </div>
                    </div>
                ),
                cell: (info) => info.getValue()
            },
            {
                id: "parent",
                header: "Parent Category",
                accessorKey: "parent",
                size: 140,
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
                size: 120,
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
