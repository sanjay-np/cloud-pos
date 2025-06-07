import { Link } from '@inertiajs/react';

import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import Icon from '@/components/ui/icon';

import { type NavItem } from '@/types';
import { type ComponentPropsWithoutRef } from 'react';

export function NavFooter({
    menuItems,
    className,
    ...props
}: ComponentPropsWithoutRef<typeof SidebarGroup> & {
    menuItems: NavItem[];
}) {
    return (
        <SidebarGroup
            className={`group-data-[collapsible=icon]:p-0 ${className || ''}`}
            {...props}
        >
            <SidebarGroupContent>
                <SidebarMenu>
                    {menuItems.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                                asChild
                                className="text-neutral-600 hover:text-neutral-800 dark:text-neutral-300 dark:hover:text-neutral-100 font-medium hover:bg-white rounded-sm"
                            >
                                <Link href={item.url} prefetch>
                                    {item?.icon && (
                                        <Icon
                                            name={item.icon}
                                            className="!size-5"
                                            weight="duotone"
                                        />
                                    )}
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}
