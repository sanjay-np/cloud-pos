import { Head, usePage } from '@inertiajs/react';

import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { DashboardStats } from './_components/stats-section';
import Overview from './_components/overview-section';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {

    const { stats } = usePage().props as any

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex flex-col gap-6">
                <DashboardStats activeCustomers={stats.activeCustomers} />
                <Overview />
            </div>
        </AppLayout>
    );
}
