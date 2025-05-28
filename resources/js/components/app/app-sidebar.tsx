import { useState } from 'react';
import { Link } from '@inertiajs/react';

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarInput,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from '@/components/ui/sidebar';
import AppLogo from '@/components/app/app-logo';

import { navigationItems } from '@/lib/navigation';
import { cn } from '@/lib/utils';

import { NavGroup } from '@/types';

export function AppSidebar() {

    const { sideNav } = navigationItems
    const [activeItem, setActiveItem] = useState<NavGroup>(sideNav[0])
    const { setOpen } = useSidebar()

    return (
        <Sidebar
            collapsible="icon"
            variant="inset"
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
                                    const isActive = activeItem?.title === item.title
                                    return (
                                        <SidebarMenuItem key={item.title}>
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
                                                    strokeWidth={1.8}
                                                    className={cn(
                                                        "!size-5 text-gray-500",
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
                    {/* Sidebar footer content  (User menu)*/}
                </SidebarFooter>
            </Sidebar>

            <Sidebar collapsible="none" className="hidden flex-1 md:flex">
                <SidebarHeader className="gap-3.5 border-b p-4">
                    <SidebarInput placeholder="Type to search..." />
                </SidebarHeader>
                <SidebarContent>
                    <SidebarGroup className="px-0">
                        <SidebarGroupContent>
                            <div className='px-4 py-2'>
                                {activeItem?.items.map((item, index) => {
                                    const subNavIsActive = item.isActive
                                    return (
                                        <div key={index} className='w-full'>
                                            <Link
                                                href={item.url}
                                                className={cn(
                                                    "text-foreground w-full p-2 block rounded-sm",
                                                    subNavIsActive && "text-primary bg-white border"
                                                )}
                                            >
                                                {item.title}
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
