import { useEffect, useState } from 'react';
import { Link, usePage } from '@inertiajs/react';

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
import Icon from '@/components/ui/icon';

import { navigationItems } from '@/lib/navigation';

import { NavGroup } from '@/types';
import { cn } from '@/lib/utils';

export function AppSidebar() {

    const { url } = usePage();

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
            className="overflow-hidden *:data-[sidebar=sidebar]:flex-row"
        >
            <Sidebar
                collapsible="none"
                className="w-[calc(var(--sidebar-width-icon)+16px)]! border-r"
            >
                <SidebarHeader>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                size="lg"
                                asChild
                                className="md:h-8 md:p-0"
                            >
                                <Link href="/dashboard" prefetch>
                                    <AppLogo />
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarHeader>

                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupContent className="px-1.5 md:px-0">
                            <SidebarMenu>
                                {sideNav.map((menuItem, index) => {
                                    const isActive = activeItem.title === menuItem.title;
                                    return (
                                        <SidebarMenuItem key={index}>
                                            <SidebarMenuButton
                                                className="px-2.5 md:px-2"
                                                isActive={isActive}
                                                tooltip={{
                                                    children: menuItem.title,
                                                    hidden: false,
                                                }}
                                                onClick={() => {
                                                    setActiveItem(menuItem)
                                                    setOpen(true)
                                                }}
                                            >
                                                <Icon
                                                    name={menuItem.icon}
                                                    weight="duotone"
                                                    className="!size-5"
                                                />
                                                <span className='hidden'>{menuItem.title}</span>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    )
                                })}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
                <SidebarFooter>
                </SidebarFooter>
            </Sidebar>

            <Sidebar
                collapsible="none"
                className="hidden flex-1 md:flex"
            >
                <SidebarHeader className="gap-3.5 border-b p-4">
                    <div className="w-full flex items-center gap-2">
                        {activeItem?.icon && (<Icon name={activeItem.icon} weight='duotone' />)}
                        {activeItem?.title}
                    </div>
                </SidebarHeader>

                <SidebarContent>
                    <SidebarGroup className="px-0">
                        <SidebarGroupContent>
                            {activeItem?.items && activeItem?.items.map((item, index) => {
                                const subNavIsActive = item.url === url;
                                return (
                                    <div key={index} className='w-full cursor-pointer'>
                                        <Link
                                            href={item.url}
                                            className={cn(
                                                "text-foreground w-full p-1 rounded-sm flex items-center gap-2 mb-1",
                                                subNavIsActive && "text-primary bg-white border"
                                            )}
                                        >
                                            {item?.icon && (
                                                <Icon
                                                    name={item.icon}
                                                    weight='duotone'
                                                    className={cn(
                                                        "!size-5 text-gray-500",
                                                        subNavIsActive && "text-primary"
                                                    )}
                                                />
                                            )}
                                            <span className='font-medium'>{item.title}</span>
                                        </Link>
                                    </div>
                                )
                            })}
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
            </Sidebar>
        </Sidebar >
    );
}
