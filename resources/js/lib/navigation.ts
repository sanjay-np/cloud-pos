import { NavGroup } from "@/types";
import {
    ArchiveIcon,
    ContactRoundIcon,
    FolderIcon,
    LayoutGridIcon,
    PackageIcon,
    SettingsIcon,
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
        ],
        includeRoutes: [
            'dashboard',
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
        ],
        includeRoutes: [
            'attributes',
            'brands',
            'categories',
            'products',
            'suppliers',
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
        ],
        includeRoutes: [
            'customers',
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
        ],
        includeRoutes: [
            'employees',
        ]
    },
    {
        id: "5",
        title: "Settings",
        icon: SettingsIcon,
        isActive: false,
        items: [
            {
                title: 'Settings',
                url: '/settings',
                icon: SettingsIcon,
                isActive: true
            },
        ],
        includeRoutes: [
            'settings',
        ]
    }
]

export const navigationItems = {
    sideNav: [...sidebarNav],
}
