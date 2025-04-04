import { Head } from '@inertiajs/react';

import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import AppTable from '@/components/table/app-table';
import { useColumns } from '@/hooks/use-columns';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Settings',
        href: '#',
    },
    {
        title: 'Currencies',
        href: '/settings/currency',
    }
];

const Index = ({ currencies, pagination }: any) => {

    const {columns, itemId, setItemId, mode, setMode} = useColumns({
        dataKey: 'id',
        customColumns: [
            {
                id: 'name',
                accessorKey: 'name',
                header: 'Currency Name',
                cell: ({ row }) => <div className="capitalize">{row.getValue('name')}</div>,
            },
            {
                id: 'symbol',
                accessorKey: 'symbol',
                header: 'Currency Symbol',
                cell: ({ row }) => <div className="lowercase">{row.getValue('symbol')}</div>,
            },
            {
                id: 'code',
                accessorKey: 'code',
                header: 'Currency Code',
                cell: ({ row }) => <div className="lowercase">{row.getValue('code')}</div>,
            },
        ]
    })
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Categories" />
            <AppTable
                data={currencies}
                pagination={pagination}
                refetch={['currencies']}
                placeholder="Search Currencies..."
                searchRoute="currencies.index"
                columns={columns}
                setMode={setMode}
            />
        </AppLayout>
    )
}

export default Index
