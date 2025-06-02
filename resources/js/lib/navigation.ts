import { NavGroup } from "@/types";
import {
    ArchiveIcon,
    FolderIcon,
    GaugeIcon,
    GearIcon,
    PackageIcon,
    SlidersIcon,
    TruckIcon,
    UserGearIcon,
    UsersIcon
} from "@phosphor-icons/react";

const sidebarNav: NavGroup[] = [
    {
        id: "1",
        title: "Dashboard",
        icon: GaugeIcon,
        items: [
            {
                title: 'Dashboard',
                url: '/dashboard',
                icon: GaugeIcon,
                includeRoutes: [
                    'dashboard'
                ]
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
        items: [
            {
                title: 'Attributes',
                url: '/attributes',
                icon: SlidersIcon,
                includeRoutes: [
                    'attributes.index',
                ]

            },
            {
                title: 'Brands',
                url: '/brands',
                icon: ArchiveIcon,
                includeRoutes: [
                    'brands.index',
                ]

            },
            {
                title: 'Categories',
                url: '/categories',
                icon: FolderIcon,
                includeRoutes: [
                    'categories.index',
                ]
            },
            {
                title: 'Products',
                url: '/products',
                icon: PackageIcon,
                includeRoutes: [
                    'products.index',
                ]
            },
            {
                title: 'Suppliers',
                url: '/suppliers',
                icon: TruckIcon,
                includeRoutes: [
                    'suppliers.index',
                ]
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
                includeRoutes: [
                    'customers.index',
                ]
            },
        ],
        includeRoutes: [
            'customers',
        ]
    },
    {
        id: "4",
        title: "Employees",
        icon: UserGearIcon,
        items: [
            {
                title: 'Employees',
                url: '/employees',
                icon: UserGearIcon,
                includeRoutes: [
                    'employees.index',
                ]
            }
        ],
        includeRoutes: [
            'employees',
        ]
    },
    {
        id: "5",
        title: "Settings",
        icon: GearIcon,
        items: [
            {
                title: 'Settings',
                url: '/settings',
                icon: GearIcon,
                includeRoutes: [
                    'settings.index',
                ]
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
