import { Head } from '@inertiajs/react'
import { IndianRupee } from 'lucide-react'
import { format } from 'date-fns'

import AppLayout from '@/layouts/app-layout'
import AppTable from '@/components/table/app-table'
import { Badge } from '@/components/ui/badge'

import { useColumns } from '@/hooks/use-columns'
import SaleOperation from './_components/sale-operation'

import { type BreadcrumbItem } from '@/types'

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Sales',
        href: '/sales',
    }
]
const Index = ({ sales, pagination }: any) => {

    const { columns, itemId, mode, setMode } = useColumns<any>({
        dataKey: "id",
        deleteRoute: "sales.delete",
        customColumns: [
            {
                accessorKey: "reference",
                header: "Invoice No.",
                cell: ({ row }) => (<div className="capitalize font-medium">{row.getValue<string>("reference")}</div>),
            },
            {
                accessorKey: "date",
                header: "Date",
                cell: ({ row }) => (<div className="capitalize font-medium">{format(row.getValue<string>("date"), "dd/MM/yyyy")}</div>),
            },
            {
                accessorKey: "customer",
                header: "Customer",
                cell: ({ row }) => {
                    const customer = row.getValue<{ name: string }>("customer");
                    return (<div className="capitalize font-medium">{customer?.name || "N/A"}</div>);
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
            <Head title="Sales" />
            <AppTable
                data={sales}
                columns={columns}
                pagination={pagination}
                refetch={['sales']}
                placeholder="Search Sales..."
                searchRoute='sales.index'
                setMode={setMode}
            />
            <SaleOperation saleId={itemId} mode={mode} />
        </AppLayout>
    )
}

export default Index
