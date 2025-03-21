import { Head } from '@inertiajs/react'
import {
    FileDownIcon,
    ListFilterIcon,
    Settings2Icon
} from "lucide-react";
import AppLayout from '@/layouts/app-layout'
import { Button } from '@/components/ui/button'
import AppTable from '@/components/table/app-table'
import AppSearch from '@/components/app/app-search'
import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";


import { useSheetStore } from '@/hooks/use-sheet';
import { useColumns } from '@/hooks/use-columns';

import { type BreadcrumbItem } from '@/types'
import ProductOperation from './_components/product-operation';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Products',
        href: '/products',
    }
]

const Index = ({ products, pagination }: any) => {

    const { openSheet } = useSheetStore();
    const { columns, itemId, mode, setMode } = useColumns({
        dataKey: "id",
        deleteRoute: "products.destroy",
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
                            <AvatarFallback className="text-2xl">{"PI"}</AvatarFallback>
                        </Avatar>
                    </>
                )
            },
            {
                id: "title",
                accessorKey: "title",
                header: "Product Name",
                cell: ({ row }) => (
                    <div className="capitalize">{row.getValue("title")}</div>
                ),
            },
            {
                id: "stock_qty",
                accessorKey: "stock_qty",
                header: "Stock",
                cell: ({ row }) => (
                    <div className="capitalize">{row.getValue("stock_qty")}</div>
                ),
            },
            {
                id: "sale_price",
                accessorKey: "sale_price",
                header: "Amount",
                cell: ({ row }) => (
                    <div className="capitalize">{row.getValue("sale_price")}</div>
                ),
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
    })

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="table-wrapper">
                <Head title="Products" />
                <div className="flex items-center justify-between py-2 gap-2">
                    <AppSearch
                        placeholder="Search Products..."
                        searchRoute='products.index'
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
                    data={products}
                    columns={columns}
                    pagination={pagination}
                    refetch={['products']}
                />
            </div>
            <ProductOperation productId={itemId} mode={mode} />
        </AppLayout>
    )
}

export default Index