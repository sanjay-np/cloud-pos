import { Head } from '@inertiajs/react'
import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import AppTable from '@/components/table/app-table'
import { useSheetStore } from '@/hooks/use-sheet'
import { useColumns } from './_components/use-columns'
import SupplierOperation from './_components/supplier-operation'
import { SupplierIndexProps } from './_components/supplier'

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
const Index = ({ suppliers, brands }: SupplierIndexProps) => {

    const { columns, itemId, mode, setMode } = useColumns()
    const { openSheet } = useSheetStore();

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Suppliers" />
            <div className="table-wrapper">
                <div className="flex items-center justify-between py-2 gap-2">
                    <Input placeholder="Search Suppliers..." />
                    <Button
                        variant="outline"
                        className="ml-auto"
                        onClick={() => {
                            setMode("add")
                            openSheet()
                        }}
                    >
                        Add New
                    </Button>
                </div>
                <AppTable
                    data={suppliers.data}
                    columns={columns}
                    meta={{
                        next_page_url: suppliers.next_page_url,
                        prev_page_url: suppliers.prev_page_url,
                    }}
                />
            </div>
            <SupplierOperation supplierId={itemId} mode={mode} brands={brands} />

        </AppLayout>
    )
}

export default Index