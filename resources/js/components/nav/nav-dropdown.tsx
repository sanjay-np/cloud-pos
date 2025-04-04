import {
    SidebarGroup,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem
} from '@/components/ui/sidebar'
import { NavGroup } from '@/types'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronRight } from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function NavDropdown({ items = [] }: { items: NavGroup[] }) {
    return (
        <SidebarGroup className="px-2 py-0">
            {items.map((menuItem, index) => (
                <SidebarMenu key={index}>
                    <Collapsible
                        asChild
                        className="group/collapsible"
                        defaultOpen={true}
                    >
                        <SidebarMenuItem>
                            <CollapsibleTrigger asChild>
                                <SidebarMenuButton tooltip={menuItem?.title}>
                                    {menuItem?.icon && <menuItem.icon />}
                                    <span>{menuItem?.title}</span>
                                    <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                                </SidebarMenuButton>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <SidebarMenuSub>
                                    {menuItem?.items?.map((subItem) => {
                                        return (
                                            <SidebarMenuSubItem key={subItem.title}>
                                                <SidebarMenuSubButton asChild>
                                                    <Link href={subItem?.url}>
                                                        <span>{subItem?.title}</span>
                                                    </Link>
                                                </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                        )
                                    })}
                                </SidebarMenuSub>
                            </CollapsibleContent>
                        </SidebarMenuItem>
                    </Collapsible>
                </SidebarMenu>
            ))}
        </SidebarGroup>
    )
}
