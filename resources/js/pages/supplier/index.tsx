import { Head } from '@inertiajs/react'

import AppLayout from '@/layouts/app-layout'
import AppTable from '@/components/table/app-table'
import { Badge } from '@/components/ui/badge';

import SupplierOperation from './_components/supplier-operation'

import { useColumns } from '@/hooks/use-columns';

import { type BreadcrumbItem } from '@/types'
import { type Brand, type SupplierColumnProps, type SupplierIndexProps } from './_components/supplier'

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Suppliers',
        href: '/suppliers',
    }
]
const Index = ({ suppliers, brands, pagination }: SupplierIndexProps) => {

    const { columns, itemId, mode, setMode } = useColumns<SupplierColumnProps>({
        dataKey: "id",
        deleteRoute: "suppliers.destroy",
        customColumns: [
            {
                id: "supplier",
                header: "Supplier",
                accessorFn: (row) => (
                    <div className="flex flex-col">
                        <div className="capitalize text-base font-medium">{row.name}</div>
                        <div className="text-muted-foreground">{row.contact_person} ({row.phone})</div>
                    </div>
                ),
                cell: (info) => info.getValue(),
            },
            {
                id: "brand_items",
                accessorKey: "brand_items",
                header: "Brands",
                size: 300,
                cell: ({ row }) => {
                    const items = row.getValue("brand_items") as Brand[]
                    return (
                        <div className="flex gap-2 px-3">
                            {items && items.map((item) => (
                                <Badge key={item.id} variant={"outline"}>
                                    {item.name}
                                </Badge>
                            ))}
                        </div>
                    )
                },
            },
        ]
    })

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Suppliers" />
            <AppTable
                data={suppliers}
                columns={columns}
                pagination={pagination}
                refetch={['suppliers']}
                placeholder="Search Suppliers..."
                searchRoute='suppliers.index'
                setMode={setMode}
            />
            <SupplierOperation supplierId={itemId} mode={mode} brands={brands} />

        </AppLayout>
    )
}

export default Index
