import { Head } from '@inertiajs/react'
import { format } from 'date-fns'
import { IndianRupee } from 'lucide-react'

import AppLayout from '@/layouts/app-layout'
import AppTable from '@/components/table/app-table'
import { Badge } from '@/components/ui/badge'

import PurchaseOperation from './_components/purchase-operation'

import { useColumns } from '@/hooks/use-columns'

import { type BreadcrumbItem } from '@/types'
import {
    type PurchaseIndexProps,
    type PurchaseColumnProps
} from './_components/purchase'

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
const Index = ({ purchases, pagination }: PurchaseIndexProps) => {

    const { columns, itemId, mode, setMode } = useColumns<PurchaseColumnProps>({
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
                cell: ({ row }) => (<div className="capitalize font-medium">{format(row.getValue<string>("date"), "dd/MM/yyyy")}</div>),
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
                        ? (<div className='flex gap-2'>{products.map((item, index) => (<Badge variant="outline" key={index}>{item}</Badge>))}</div>)
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
        ],
        additionalOptions: [
            {
                label: "Add Payment",
                onClick: () => { },
                icon: IndianRupee
            }
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