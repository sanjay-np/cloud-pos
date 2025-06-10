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
import { NavUser } from '../nav/nav-user';

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
            variant="sidebar"
            className="overflow-hidden *:data-[sidebar=sidebar]:flex-row"
        >
            <Sidebar
                collapsible="none"
                className="w-[calc(var(--sidebar-width-icon))]! border-r"
            >
                <SidebarHeader>
                    <SidebarMenu className="px-0 flex items-center justify-center">
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                size="lg"
                                asChild
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
                            <SidebarMenu className='px-1'>
                                {sideNav.map((menuItem, index) => {
                                    const isActive = activeItem.title === menuItem.title;
                                    return (
                                        <SidebarMenuItem key={index}>
                                            <SidebarMenuButton
                                                className={cn(
                                                    "flex items-center justify-center rounded-md py-[18px] mb-2 cursor-pointer",
                                                    isActive && "bg-white border"
                                                )}
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
                                                    className={cn(
                                                        "!size-6 text-muted-foreground",
                                                        isActive && "text-primary"
                                                    )}
                                                />
                                                <span className='hidden'>{menuItem.title}</span>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    )
                                })}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>

                    <SidebarGroup className='mt-auto'>
                        <SidebarGroupContent className="px-1.5 md:px-0">
                            <SidebarMenu className='px-1'>
                                <SidebarMenuItem>
                                    <SidebarMenuButton
                                        className={cn(
                                            "flex items-center justify-center rounded-md py-[18px] mb-2 cursor-pointer",
                                        )}
                                        tooltip={{
                                            children: "Support",
                                            hidden: false,
                                        }}
                                    >
                                        <Icon
                                            name={"QuestionIcon"}
                                            weight="duotone"
                                            className={cn(
                                                "!size-6 text-muted-foreground",
                                            )}
                                        />
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton
                                        className={cn(
                                            "flex items-center justify-center rounded-md py-[18px] mb-2 cursor-pointer",
                                        )}
                                        tooltip={{
                                            children: "Live Chat",
                                            hidden: false,
                                        }}
                                    >
                                        <Icon
                                            name={"ChatsIcon"}
                                            weight="duotone"
                                            className={cn(
                                                "!size-6 text-muted-foreground",
                                            )}
                                        />
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>

                <SidebarFooter>
                    <NavUser />
                </SidebarFooter>
            </Sidebar>

            <Sidebar
                collapsible="none"
                className="hidden flex-1 md:flex"
            >
                <SidebarHeader className="gap-3.5 p-4">
                    <div className="w-full flex gap-3 items-center text-md text-secondary-foreground bg-white border rounded-md py-1 px-2 shadow-xs">
                        {activeItem?.icon && (<Icon name={activeItem.icon} weight='duotone' className="!size-5 text-muted-foreground" />)}
                        {activeItem?.title}
                    </div>
                </SidebarHeader>

                <SidebarContent>
                    <SidebarGroup className="px-3">
                        <SidebarGroupContent>
                            {activeItem?.items && activeItem?.items.map((item, index) => {
                                const subNavIsActive = item.url === url;
                                return (
                                    <div key={index} className='w-full cursor-pointer'>
                                        <Link
                                            href={item.url}
                                            className={cn(
                                                "text-foreground w-full py-1.5 px-2 rounded-md flex items-center gap-2.5 mb-1",
                                                subNavIsActive && "text-primary bg-white border"
                                            )}
                                        >
                                            {item?.icon && (
                                                <Icon
                                                    name={item.icon}
                                                    weight='duotone'
                                                    className={cn(
                                                        "!size-5 text-muted-foreground",
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
