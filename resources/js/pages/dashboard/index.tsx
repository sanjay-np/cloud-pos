import { Head } from '@inertiajs/react';

import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { SectionCards } from './_components/section-cards';
import { ChartAreaInteractive } from './_components/chart-area-interactive';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex flex-col gap-6">
                <SectionCards />
                <div className="">
                    {/* <ChartAreaInteractive /> */}
                </div>
            </div>
        </AppLayout>
    );
}
