import { usePage } from '@inertiajs/react';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { UserInfo } from '@/components/user-info';
import { UserMenuContent } from '@/components/user-menu-content';

import { useIsMobile } from '@/hooks/use-mobile';

import { type SharedData } from '@/types';

export function NavUser() {

    const { auth } = usePage<SharedData>().props;
    const isMobile = useIsMobile();


    return (
        <SidebarMenu>
            <SidebarMenuItem className="pb-4 flex items-center justify-center">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground md:h-8 md:p-0 flex items-center justify-center focus:ring-0"
                        >
                            <UserInfo user={auth.user} />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-md"
                        align="end"
                        sideOffset={4}
                        side={isMobile ? 'bottom' : 'right'}
                    >
                        <UserMenuContent user={auth.user} />
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
