import { Head } from '@inertiajs/react';

import AppTable from '@/components/table/app-table';
import { Badge } from '@/components/ui/badge';
import { useColumns } from '@/hooks/use-columns';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import CurrencyOperation from './_components/currency-operation';

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
    },
];

const Index = ({ currencies, pagination }: any) => {

    const { columns, itemId, mode, setMode } = useColumns({
        dataKey: 'id',
        deleteRoute: 'currencies.destroy',
        customColumns: [
            {
                id: 'name',
                accessorKey: 'name',
                header: 'Currency Name',
                cell: ({ row }) => <div className="capitalize">{row.getValue('name')}</div>,
            },
            {
                id: 'label',
                accessorKey: 'label',
                header: 'Currency Symbol',
                size: 180,
                cell: ({ row }) => <div>{row.getValue('label')}</div>,
            },
            {
                id: 'is_current',
                accessorKey: 'is_current',
                header: 'Active',
                size: 140,
                cell: ({ row }) => (
                    <div className="capitalize">
                        <Badge
                            variant={row.getValue('is_current') ? 'success' : 'error'}
                        >
                            {row.getValue('is_current') ? 'Active' : 'Inactive'}
                        </Badge>
                    </div>
                ),
            },
        ],
    });
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
            <CurrencyOperation currencyId={itemId} mode={mode} />
        </AppLayout>
    );
};

export default Index;
