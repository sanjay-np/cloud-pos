import { Head } from '@inertiajs/react'

import AppLayout from '@/layouts/app-layout'
import AppTable from '@/components/table/app-table'
import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

import { useColumns } from '@/hooks/use-columns';

import { type BreadcrumbItem } from '@/types'
import ProductOperation from './_components/product-operation';
import { formattedNumber } from '@/lib/utils';

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

const Index = ({ products, pagination, default_currency }: any) => {

    const { columns, itemId, mode, setMode } = useColumns({
        dataKey: "id",
        deleteRoute: "products.destroy",
        customColumns: [
            {
                id: "product",
                header: "Product",
                accessorFn: (row) => (
                    <div className="flex gap-3 items-center w-[300px]">
                        <div>
                            <Avatar className={`size-16 transition-colors`}>
                                <AvatarImage
                                    src={row.image_url as string | undefined}
                                    alt="Profile picture"
                                    className="object-cover"
                                />
                                <AvatarFallback className="text-2xl">{"PI"}</AvatarFallback>
                            </Avatar>
                        </div>
                        <div className="">
                            <div className="capitalize text-md ">{row.title}</div>
                        </div>
                    </div>
                ),
                cell: (info) => info.getValue()
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
                    <div className="capitalize">
                        {`${default_currency} ${formattedNumber(row.getValue("sale_price"), 2)}`}
                    </div>
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
            <Head title="Products" />
            <AppTable
                data={products}
                columns={columns}
                pagination={pagination}
                refetch={['products']}
                placeholder="Search Products..."
                searchRoute='products.index'
                setMode={setMode}
            />
            <ProductOperation productId={itemId} mode={mode} />
        </AppLayout>
    )
}

export default Index
