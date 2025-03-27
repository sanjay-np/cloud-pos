import { Head } from '@inertiajs/react'

import AppLayout from '@/layouts/app-layout'
import AppTable from '@/components/table/app-table'

import PurchaseOperation from './_components/purchase-operation'

import { useColumns } from '@/hooks/use-columns'

import { type BreadcrumbItem } from '@/types'
import { Badge } from '@/components/ui/badge'

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Purchases',
        href: '/purchases',
    }
]
const Index = ({ purchases, pagination }: any) => {

    console.log(purchases);


    const { columns, itemId, mode, setMode } = useColumns<any>({
        dataKey: "id",
        deleteRoute: "purchases.delete",
        customColumns: [
            {
                accessorKey: "reference",
                header: "Purchase Code",
                cell: ({ row }) => (<div className="capitalize font-medium">{row.getValue<string>("reference")}</div>),
            },
            {
                accessorKey: "date",
                header: "Date",
                cell: ({ row }) => (<div className="capitalize font-medium">{row.getValue<string>("date")}</div>),
            },
            {
                accessorKey: "supplier",
                header: "Supplier",
                cell: ({ row }) => {
                    const supplier = row.getValue<{ name: string }>("supplier");
                    return (<div className="capitalize font-medium">{supplier?.name || "N/A"}</div>);
                },
            },
            {
                accessorKey: "products",
                header: "Products",
                cell: ({ row }) => {
                    const products = row.getValue<string[]>("products") ?? [];
                    return products.length > 0
                        ? (products.map((item, index) => (<Badge variant="outline" key={index}>{item}</Badge>)))
                        : (<span>No Products</span>);
                },
            },
            {
                accessorKey: "total_amount",
                header: "Total Amount",
                cell: ({ row }) => (<div className="capitalize font-medium">{row.getValue<string>("total_amount")}</div>),
            },
            {
                accessorKey: "payment_status",
                header: "Payment Status",
                cell: ({ row }) => (<div className="capitalize font-medium">{row.getValue<string>("payment_status")}</div>),
            },
        ]

    })

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Purchases" />
            <AppTable
                data={purchases}
                columns={columns}
                pagination={pagination}
                refetch={['purchases']}
                setMode={setMode}
                placeholder="Search Purchases..."
                searchRoute='purchases.index'
            />
            <PurchaseOperation purchaseId={itemId} mode={mode} />
        </AppLayout>
    )
}

export default Index