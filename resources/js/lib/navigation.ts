import { NavGroup } from "@/types";
import {
    ArchiveIcon,
    ContactRoundIcon,
    FolderIcon,
    LayoutGridIcon,
    PackageIcon,
    SlidersIcon,
    TruckIcon,
    UsersIcon
} from "lucide-react";

const sidebarNav: NavGroup[] = [
    {
        id: "1",
        title: "Dashboard",
        icon: LayoutGridIcon,
        isActive: true,
        items: [
            {
                title: 'Dashboard',
                url: '/dashboard',
                icon: LayoutGridIcon,
                isActive: true,
            },
            {
                title: 'Reports',
                url: '/dashboard',
                icon: LayoutGridIcon,
                isActive: false,
            },

        ]
    },
    {
        id: "2",
        title: "Products",
        icon: PackageIcon,
        isActive: false,
        items: [
            {
                title: 'Attributes',
                url: '/attributes',
                icon: SlidersIcon,
            },
            {
                title: 'Brands',
                url: '/brands',
                icon: ArchiveIcon,
            },
            {
                title: 'Categories',
                url: '/categories',
                icon: FolderIcon,
            },
            {
                title: 'Products',
                url: '/products',
                icon: PackageIcon,
            },
            {
                title: 'Suppliers',
                url: '/suppliers',
                icon: TruckIcon,
            },
        ]
    },
    {
        id: "3",
        title: "Customers",
        icon: UsersIcon,
        isActive: false,
        items: [
            {
                title: 'Customers',
                url: '/customers',
                icon: UsersIcon,
            },
            {
                title: 'Settings',
                url: '/employees',
                icon: ContactRoundIcon,
            },
        ]
    },
    {
        id: "4",
        title: "Employees",
        icon: ContactRoundIcon,
        isActive: false,
        items: [
            {
                title: 'Employees',
                url: '/employees',
                icon: ContactRoundIcon,
                isActive: false,
            },
            {
                title: 'Settings',
                url: '/employees',
                icon: ContactRoundIcon,
                isActive: true
            },
        ]
    },
]

export const navigationItems = {
    sideNav: [...sidebarNav],
}
