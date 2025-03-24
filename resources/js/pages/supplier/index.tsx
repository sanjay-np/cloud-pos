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
                id: "name",
                accessorKey: "name",
                header: "Supplier Name",
                cell: ({ row }) => (
                    <div className="capitalize">{row.getValue("name")}</div>
                ),
            },
            {
                id: "contact_person",
                accessorKey: "contact_person",
                header: "Contact Person",
                cell: ({ row }) => <div className="capitalize">{row.getValue("contact_person")}</div>,
            },
            {
                id: "phone",
                accessorKey: "phone",
                header: "Contact",
                cell: ({ row }) => <div className="lowercase">{row.getValue("phone")}</div>,
            },
            {
                id: "brand_items",
                accessorKey: "brand_items",
                header: "Brands",
                cell: ({ row }) => {
                    const items = row.getValue("brand_items") as Brand[]
                    return (
                        <div className="flex gap-2">
                            {items && items.map((item) => <Badge variant={"outline"} key={item.id}>{item.name}</Badge>)}
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