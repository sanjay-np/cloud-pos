import { Head } from '@inertiajs/react';
import { format } from 'date-fns';

import AppTable from '@/components/table/app-table';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';

import PurchaseOperation from './_components/purchase-operation';

import { useColumns } from '@/hooks/use-columns';

import { type BreadcrumbItem } from '@/types';
import { useState } from 'react';
import { type PurchaseColumnProps, type PurchaseIndexProps } from './_components/purchase';
import { PurchasePaymentForm } from './_components/purchase-payment-form';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Purchases',
        href: '/purchases',
    },
];
const Index = ({ purchases, pagination, default_currency }: PurchaseIndexProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { columns, itemId, setItemId, mode, setMode } = useColumns<PurchaseColumnProps>({
        dataKey: 'id',
        deleteRoute: 'purchases.delete',
        customColumns: [
            {
                accessorKey: 'reference',
                header: 'Invoice No.',
                cell: ({ row }) => <div className="font-medium capitalize">{row.getValue<string>('reference')}</div>,
            },
            {
                accessorKey: 'date',
                header: 'Date',
                cell: ({ row }) => <div className="font-medium capitalize">{format(row.getValue<string>('date'), 'PPP')}</div>,
            },
            {
                accessorKey: 'supplier',
                header: 'Supplier',
                cell: ({ row }) => {
                    const supplier = row.getValue<{ name: string }>('supplier');
                    return <div className="font-medium capitalize">{supplier?.name || 'N/A'}</div>;
                },
            },
            {
                accessorKey: 'products',
                header: 'Products',
                cell: ({ row }) => {
                    const products = row.getValue<string[]>('products') ?? [];
                    return products.length > 0 ? (
                        <div className="flex gap-2">
                            {products.map((item, index) => (
                                <Badge variant="outline" key={index}>
                                    {item}
                                </Badge>
                            ))}
                        </div>
                    ) : (
                        <span>No Products</span>
                    );
                },
            },
            {
                accessorKey: 'total_amount',
                header: 'Total Amount',
                cell: ({ row }) => <div className="font-medium capitalize">{`${default_currency} ${row.getValue<number>('total_amount')}`}</div>,
            },
            {
                accessorKey: 'payment_status',
                header: 'Payment Status',
                cell: ({ row }) => <div className="font-medium capitalize">{row.getValue<string>('payment_status')}</div>,
            },
        ],
        additionalOptions: [
            {
                label: 'Add Payment',
                onClick: () => {
                    setItemId(itemId);
                    setIsOpen(!isOpen);
                },
                icon: "CurrencyInrIcon",
            },
        ],
    });

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
                searchRoute="purchases.index"
            />
            <PurchaseOperation purchaseId={itemId} mode={mode} />
            <PurchasePaymentForm open={isOpen} onClose={() => setIsOpen(!isOpen)} purchaseId={itemId} />
        </AppLayout>
    );
};

export default Index;
