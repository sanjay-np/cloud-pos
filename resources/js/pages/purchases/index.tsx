import { Head } from '@inertiajs/react'

import AppLayout from '@/layouts/app-layout'
import AppTable from '@/components/table/app-table'

import PurchaseOperation from './_components/purchase-operation'

import { useColumns } from '@/hooks/use-columns'

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

    const { columns, itemId, mode, setMode } = useColumns<any>({
        dataKey: "id"
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