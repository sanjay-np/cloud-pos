import { Head } from '@inertiajs/react'
import {
    FileDownIcon,
    ListFilterIcon,
    Settings2Icon
} from "lucide-react";

import AppLayout from '@/layouts/app-layout'
import { Button } from '@/components/ui/button'
import AppTable from '@/components/table/app-table'

import { useColumns } from './_components/use-columns'
import SupplierOperation from './_components/supplier-operation'
import { SupplierIndexProps } from './_components/supplier'

import { useSheetStore } from '@/hooks/use-sheet'
import { type BreadcrumbItem } from '@/types'
import AppSearch from '@/components/app/app-search'

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

    const { columns, itemId, mode, setMode } = useColumns()
    const { openSheet } = useSheetStore();

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Suppliers" />
            <div className="table-wrapper">
                <div className="flex items-center justify-between py-2 gap-2">
                    <AppSearch
                        placeholder="Search Suppliers..."
                        searchRoute='suppliers.index'
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
                    data={suppliers}
                    columns={columns}
                    pagination={pagination}
                    refetch={['suppliers']}
                />
            </div>
            <SupplierOperation supplierId={itemId} mode={mode} brands={brands} />

        </AppLayout>
    )
}

export default Index