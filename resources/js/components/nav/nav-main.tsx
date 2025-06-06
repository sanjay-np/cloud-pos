import { Link } from "@inertiajs/react";

import {
    Collapsible,
    CollapsibleContent,
} from "@/components/ui/collapsible"
import {
    SidebarGroup,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import Icon from '@/components/ui/icon';

import { type NavGroup } from '@/types';

export function NavMain({ menuItems = [] }: { menuItems: NavGroup[] }) {
    return (
        <SidebarGroup>
            <SidebarMenu>
                {menuItems.map((menuItem, index) => (
                    <Collapsible key={index} asChild defaultOpen={true}>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild tooltip={menuItem.title}>
                                {!menuItem.isGroup ? (
                                    <Link href={menuItem.url}>
                                        <Icon
                                            name={menuItem.icon}
                                            className="!size-5"
                                            weight="duotone"
                                        />
                                        <span>{menuItem.title}</span>
                                    </Link>
                                ) : (
                                    <a href="#">
                                        <Icon
                                            name={menuItem.icon}
                                            className="!size-5"
                                            weight="duotone"
                                        />
                                        <span>{menuItem.title}</span>
                                    </a>
                                )}
                            </SidebarMenuButton>

                            {menuItem.items?.length ? (
                                <>
                                    <CollapsibleContent>
                                        <SidebarMenuSub>
                                            {menuItem.items?.map((subItem) => (
                                                <SidebarMenuSubItem key={subItem.title}>
                                                    <SidebarMenuSubButton asChild>
                                                        <a href={subItem.url}>
                                                            {subItem?.icon && (
                                                                <Icon
                                                                    name={subItem.icon}
                                                                    className="!size-4"
                                                                    weight="duotone"
                                                                />
                                                            )}
                                                            <span>{subItem.title}</span>
                                                        </a>
                                                    </SidebarMenuSubButton>
                                                </SidebarMenuSubItem>
                                            ))}
                                        </SidebarMenuSub>
                                    </CollapsibleContent>
                                </>
                            ) : null}
                        </SidebarMenuItem>
                    </Collapsible>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
