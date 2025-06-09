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
                            <SidebarMenuButton
                                tooltip={menuItem.title}
                                className="text-neutral-600 hover:text-neutral-800 dark:text-neutral-300 dark:hover:text-neutral-100 font-semibold rounded-sm"
                                asChild
                            >
                                {!menuItem.isGroup ? (
                                    <Link href={menuItem.url} prefetch>
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
                                                    <SidebarMenuSubButton
                                                        className="text-neutral-600 hover:text-neutral-800 dark:text-neutral-300 dark:hover:text-neutral-100 font-semibold rounded-sm"
                                                        asChild
                                                    >
                                                        <Link href={subItem.url} prefetch>
                                                            {subItem?.icon && (
                                                                <Icon
                                                                    name={subItem.icon}
                                                                    className="!size-4"
                                                                    weight="duotone"
                                                                />
                                                            )}
                                                            <span>{subItem.title}</span>
                                                        </Link>
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
