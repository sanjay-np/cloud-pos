import { AppConfirmModal } from '@/components/app/app-confirm-modal';
import { useAppearance } from '@/hooks/use-appearance';
import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';
import { Toaster } from 'sonner';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => {
    const { appearance } = useAppearance();
    return (
        <AppLayoutTemplate
            breadcrumbs={breadcrumbs}
            {...props}
        >
            {children}
            <Toaster theme={appearance} />
            <AppConfirmModal />
        </AppLayoutTemplate>
    )
}
