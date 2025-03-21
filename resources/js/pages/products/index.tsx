import { Head } from '@inertiajs/react'
import {
    FileDownIcon,
    ListFilterIcon,
    Settings2Icon
} from "lucide-react";
import AppLayout from '@/layouts/app-layout'
import { Button } from '@/components/ui/button'
import AppTable from '@/components/table/app-table'
import AppSearch from '@/components/app/app-search'

import { useColumns } from './_components/use-columns';

import { type BreadcrumbItem } from '@/types'
import { useSheetStore } from '@/hooks/use-sheet';
import ProductOperation from './_components/product-operation';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Products',
        href: '/products',
    }
]

const Index = ({ products, pagination }: any) => {

    const { columns, itemId, mode, setMode } = useColumns()
    const { openSheet } = useSheetStore();

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />
            <div className="table-wrapper">
                <div className="flex items-center justify-between py-2 gap-2">
                    <AppSearch
                        placeholder="Search Products..."
                        searchRoute='products.index'
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
                    data={products}
                    columns={columns}
                    pagination={pagination}
                    refetch={['products']}
                />
            </div>
            <ProductOperation productId={itemId} mode={mode} />
        </AppLayout>
    )
}

export default Index