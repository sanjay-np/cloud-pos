import { Link } from '@inertiajs/react';
import AppLogo from '@/components/app/app-logo';
import { NavFooter } from '@/components/nav/nav-footer';
import { NavMain } from '@/components/nav/nav-main';
import { NavUser } from '@/components/nav/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from '@/components/ui/sidebar';
import {
    footerNavItems,
    mainNavItems,
    operationMenuItems,
    productMenuItems,
    userMenuItems,
} from '@/lib/app-menu';
import NavDropdown from '../nav/nav-dropdown';

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />

                <SidebarGroupLabel>Operations</SidebarGroupLabel>
                <NavMain items={operationMenuItems} />

                <SidebarGroupLabel>Products</SidebarGroupLabel>
                <NavMain items={productMenuItems} />

                <SidebarGroupLabel>Users</SidebarGroupLabel>
                <NavMain items={userMenuItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
