import HeadingSmall from '@/components/heading-small';
import AppLayout from '@/layouts/app-layout';
import OptionsLayout from '@/layouts/options/layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import EmailSettingsForm from './_components/email-settings-form';

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

const Index = ({ emailSettings }: any) => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Email Settings" />
            <OptionsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Email Settings" description="Manage your shop information" />
                    <EmailSettingsForm emailSetings={emailSettings} />
                </div>
            </OptionsLayout>
        </AppLayout>
    );
};

export default Index;
