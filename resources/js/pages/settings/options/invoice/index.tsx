import HeadingSmall from '@/components/heading-small';
import AppLayout from '@/layouts/app-layout';
import OptionsLayout from '@/layouts/options/layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import InvoiceSettingsForm from './_components/invoice-settings-form';

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
        title: 'Options',
        href: '/settings/options',
    },
];

const Index = () => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Invoice Settings" />
            <OptionsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Shop Information" description="Manage your shop information" />
                    <InvoiceSettingsForm />
                </div>
            </OptionsLayout>
        </AppLayout>
    );
};

export default Index;
