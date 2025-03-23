import { Head } from '@inertiajs/react'
import {
    FileDownIcon,
    ListFilterIcon,
    Settings2Icon
} from 'lucide-react'

import AppLayout from '@/layouts/app-layout'
import AppSearch from '@/components/app/app-search'
import AppTable from '@/components/table/app-table'
import { Button } from '@/components/ui/button'
import PurchaseOperation from './_components/purchase-operation'

import { useColumns } from '@/hooks/use-columns'
import { useSheetStore } from '@/hooks/use-sheet'

import { type BreadcrumbItem } from '@/types'

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

    const { openSheet } = useSheetStore();
    const { columns, itemId, mode, setMode } = useColumns<any>({
        dataKey: "id"
    })

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Purchases" />
            <div className="table-wrapper">
                <div className="flex items-center justify-between py-2 gap-2">
                    <AppSearch
                        placeholder="Search Purchases..."
                        searchRoute='purchases.index'
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
                    data={purchases}
                    columns={columns}
                    pagination={pagination}
                    refetch={['purchases']}
                />
            </div>
            <PurchaseOperation purchaseId={itemId} mode={mode} />
        </AppLayout>
    )
}

export default Index