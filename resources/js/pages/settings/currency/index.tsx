import { Head } from '@inertiajs/react';

import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

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
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Categories" />
        </AppLayout>
    )
}

export default Index