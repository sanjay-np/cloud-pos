import { Head } from '@inertiajs/react'

import AppLayout from '@/layouts/app-layout'
import AppTable from '@/components/table/app-table'

import { useColumns } from '@/hooks/use-columns'

import { type BreadcrumbItem } from '@/types'
import SaleOperation from './_components/sale-operation'

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
        dataKey: "id"
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