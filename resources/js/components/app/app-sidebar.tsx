import { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { BoxArrowDownIcon } from '@phosphor-icons/react';

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from '@/components/ui/sidebar';
import AppLogo from '@/components/app/app-logo';

import { navigationItems } from '@/lib/navigation';
import { cn } from '@/lib/utils';

import { NavGroup } from '@/types';
import { NavUser } from '../nav/nav-user';

export function AppSidebar() {

    const { sideNav } = navigationItems;
    const { setOpen } = useSidebar();

    const [activeItem, setActiveItem] = useState<NavGroup>(sideNav[0]);
    const currentRouteName = route().current() as string;

    useEffect(() => {
        const matchedItem = sideNav.find(item =>
            item.includeRoutes.includes(currentRouteName.split('.')[0])
        ) ?? sideNav[0];

        setActiveItem(matchedItem);
    }, [currentRouteName, sideNav]);

    return (
        <Sidebar
            collapsible="icon"
            variant="sidebar"
            className="overflow-hidden [&>[data-sidebar=sidebar]]:flex-row"
        >
            <Sidebar
                collapsible="none"
                className="!w-[calc(var(--sidebar-width-icon)_+_1px)] border-r"
            >
                <SidebarHeader>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton size="lg" asChild className="md:h-8 md:p-0">
                                <AppLogo />
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarHeader>

                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupContent className="px-1.5 md:px-0">
                            <SidebarMenu>
                                {sideNav.map((item) => {
                                    const isActive = activeItem.title === item.title;
                                    return (
                                        <SidebarMenuItem key={item.title} className='flex align-center justify-center'>
                                            <SidebarMenuButton
                                                size="lg"
                                                isActive={isActive}
                                                className={cn("rounded-md flex justify-center items-center h-9 p-0 w-9 mb-2 cursor-pointer")}
                                                onClick={() => {
                                                    setActiveItem(item)
                                                    setOpen(true)
                                                }}
                                                tooltip={{
                                                    children: item.title,
                                                    hidden: false,
                                                }}
                                            >
                                                <item.icon
                                                    weight="duotone"
                                                    className={cn(
                                                        "!size-6 text-gray-500",
                                                        isActive && "text-primary"
                                                    )}
                                                />
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    )
                                })}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
                <SidebarFooter>
                    <NavUser />
                </SidebarFooter>
            </Sidebar>

            <Sidebar collapsible="none" className="hidden flex-1 md:flex">
                <SidebarHeader className="gap-3.5 p-4 border-b">
                    {activeItem && (
                        <div className="flex items-center gap-2">
                            <BoxArrowDownIcon
                                weight="duotone"
                                className={cn("!size-6 text-gray-500")}
                            />
                            <span className="text-sm font-medium">{activeItem.title}</span>
                        </div>
                    )}
                </SidebarHeader>
                <SidebarContent>
                    <SidebarGroup className="px-0">
                        <SidebarGroupContent>
                            <div className='px-2 py-2'>
                                {activeItem?.items.map((item, index) => {
                                    const subNavIsActive = item.includeRoutes.includes(currentRouteName)
                                    return (
                                        <div key={index} className='w-full cursor-pointer'>
                                            <Link
                                                href={item.url}
                                                className={cn(
                                                    "text-foreground w-full p-2 block rounded-sm",
                                                    subNavIsActive && "text-primary bg-white border"
                                                )}
                                            >
                                                <span className='flex items-center gap-2.5'>
                                                    {item.icon && (
                                                        <item.icon
                                                            weight="duotone"
                                                            className={cn(
                                                                "!size-5 text-gray-500",
                                                                subNavIsActive && "text-primary"
                                                            )}
                                                        />

                                                    )}
                                                    {item.title}
                                                </span>
                                            </Link>
                                        </div>
                                    )
                                })}
                            </div>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent >
            </Sidebar >
        </Sidebar >
    );
}
