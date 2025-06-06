import { Link } from "@inertiajs/react";
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import Icon from '@/components/ui/icon';

import { type NavGroup } from '@/types';

export function NavMain({ menuItems = [] }: { menuItems: NavGroup[] }) {
    return (
        <SidebarGroup>
            {menuItems.map((menuItem, index) => (
                <div key={index}>
                    {!menuItem.isGroup && (
                        <SidebarMenu>
                            <SidebarMenuItem className="pb-2">
                                <SidebarMenuButton
                                    tooltip={menuItem.title}
                                    className="hover:bg-white hover:text-primary rounded-sm transition-all duration-300 ease-in-out"
                                    asChild
                                >
                                    <Link href={menuItem.url}>
                                        <Icon
                                            name={menuItem.icon}
                                            className="!size-5"
                                            weight="duotone"
                                        />
                                        <span>{menuItem.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    )}
                    {menuItem.isGroup && (
                        <>
                            <SidebarGroupLabel>{menuItem.title}</SidebarGroupLabel>
                            {menuItem?.items !== undefined && menuItem.items.map((item, index) => {
                                return (
                                    <SidebarMenuItem key={index} className="pb-1">
                                        <SidebarMenuButton
                                            tooltip={item.title}
                                            className="hover:bg-white hover:text-primary rounded-sm transition-all duration-300 ease-in-out"
                                            asChild
                                        >
                                            <Link href={item.url}>
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
                                )
                            })}
                        </>
                    )}
                </div>
            ))}
        </SidebarGroup>
    );
}
