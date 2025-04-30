import { useState } from 'react';
import { Head } from '@inertiajs/react';
import { format } from 'date-fns';
import { IndianRupee } from 'lucide-react';

import AppTable from '@/components/table/app-table';
import AppLayout from '@/layouts/app-layout';
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Button } from '@/components/ui/button';

import { useColumns } from '@/hooks/use-columns';
import SaleOperation from './_components/sale-operation';
import { SalePaymentForm } from './_components/sales-payment-form';

import { formattedNumber } from '@/lib/utils';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Sales',
        href: '/sales',
    },
];
const Index = ({ sales, pagination, default_currency }: any) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { columns, itemId, setItemId, mode, setMode } = useColumns<any>({
        dataKey: 'id',
        deleteRoute: 'sales.delete',
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
                accessorKey: 'customer',
                header: 'Customer',
                cell: ({ row }) => {
                    const customer = row.getValue<{ name: string }>('customer');
                    return <div className="font-medium capitalize">{customer?.name || 'N/A'}</div>;
                },
            },
            {
                accessorKey: 'products',
                header: 'Products',
                cell: ({ row }) => {
                    const products = row.getValue<string[]>('products') ?? [];
                    return (
                        <HoverCard>
                            <HoverCardTrigger asChild>
                                <Button variant="link">Products</Button>
                            </HoverCardTrigger>
                            <HoverCardContent className="w-80">
                                <div className="flex flex-col flex-wrap justify-between space-x-4">
                                    {products.length > 0 && products.map((item, index) => (
                                        <div className='text-sm' key={index}>
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </HoverCardContent>
                        </HoverCard>
                    )
                },
            },
            {
                accessorKey: 'total_amount',
                header: 'Total Amount',
                cell: ({ row }) => <div className="font-medium capitalize">{`${default_currency} ${formattedNumber(row.getValue<number>('total_amount'))}`}</div>,
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
                icon: IndianRupee,
            },
        ],
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Sales" />
            <AppTable
                data={sales}
                columns={columns}
                pagination={pagination}
                refetch={['sales']}
                placeholder="Search Sales..."
                searchRoute="sales.index"
                setMode={setMode}
            />
            <SaleOperation saleId={itemId} mode={mode} />
            <SalePaymentForm open={isOpen} onClose={() => setIsOpen(!isOpen)} saleId={itemId} />
        </AppLayout>
    );
};

export default Index;
