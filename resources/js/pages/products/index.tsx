import { Head } from '@inertiajs/react'

import AppLayout from '@/layouts/app-layout'
import AppTable from '@/components/table/app-table'
import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Icon from '@/components/ui/icon';

import ProductOperation from './_components/product-operation';

import { formattedNumber } from '@/lib/utils';
import { useColumns } from '@/hooks/use-columns';

import { type BreadcrumbItem } from '@/types'
import { ProductColumnProps, ProductIndexProps } from './_components/product';

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

const Index = ({ products, pagination, currencySymbol }: ProductIndexProps) => {

    const { columns, itemId, mode, setMode } = useColumns<ProductColumnProps>({
        dataKey: "id",
        deleteRoute: "products.destroy",
        customColumns: [
            {
                id: "product",
                header: "Product",
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
                                        name="PackageIcon"
                                        weight='duotone'
                                    />
                                </AvatarFallback>
                            </Avatar>
                        </div>
                        <div className="flex flex-col">
                            <div className="capitalize text-base font-medium">{row.title}</div>
                            <div className="capitalize text-muted-foreground">
                                {formattedNumber(row.sale_price, currencySymbol)}
                            </div>
                        </div>
                    </div>
                ),
                cell: (info) => info.getValue()
            },
            {
                id: "stock_qty",
                accessorKey: "stock_qty",
                header: "Stock",
                size: 120,
                cell: ({ row }) => (
                    <div className="capitalize">{row.getValue("stock_qty")}</div>
                ),
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
