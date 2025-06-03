import { NavGroup } from "@/types";

const sidebarNav: NavGroup[] = [
    {
        id: "1",
        title: "Dashboard",
        icon: "GaugeIcon",
        items: [
            {
                title: 'Dashboard',
                url: '/dashboard',
                icon: "GaugeIcon",
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
        title: "Operations",
        icon: "MathOperationsIcon",
        items: [
            {
                title: 'POS',
                url: '/pos',
                icon: "CashRegisterIcon",
                includeRoutes: [
                    'sales.pos'
                ]
            },
            {
                title: 'Purchase',
                url: '/purchases',
                icon: "CoinsIcon",
                includeRoutes: [
                    'purchases.index'
                ]
            },
            {
                title: 'Sales',
                url: '/sales',
                icon: "TagIcon",
                includeRoutes: [
                    'sales.index'
                ]
            },
            {
                title: 'Expenses',
                url: '/expenses',
                icon: "ReceiptIcon",
                includeRoutes: [
                    'expenses.index'
                ]
            },
        ],
        includeRoutes: [
            'pos',
            'purchases',
            'sales',
            'expenses',
        ]
    },
    {
        id: "3",
        title: "Products",
        icon: "PackageIcon",
        items: [
            {
                title: 'Attributes',
                url: '/attributes',
                icon: "SlidersIcon",
                includeRoutes: [
                    'attributes.index',
                ]

            },
            {
                title: 'Brands',
                url: '/brands',
                icon: "ArchiveIcon",
                includeRoutes: [
                    'brands.index',
                ]

            },
            {
                title: 'Categories',
                url: '/categories',
                icon: "FolderIcon",
                includeRoutes: [
                    'categories.index',
                ]
            },
            {
                title: 'Products',
                url: '/products',
                icon: "PackageIcon",
                includeRoutes: [
                    'products.index',
                ]
            },
            {
                title: 'Suppliers',
                url: '/suppliers',
                icon: "TruckIcon",
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
        id: "4",
        title: "Customers",
        icon: "UsersIcon",
        isActive: false,
        items: [
            {
                title: 'Customers',
                url: '/customers',
                icon: "UsersIcon",
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
        id: "5",
        title: "Employees",
        icon: "IdentificationBadgeIcon",
        items: [
            {
                title: 'Employees',
                url: '/employees',
                icon: "IdentificationBadgeIcon",
                includeRoutes: [
                    'employees.index',
                ]
            },
            {
                title: 'Setup',
                url: '/employees',
                icon: "SlidersIcon",
                includeRoutes: [
                    'employees.setup.index',
                ]
            }

        ],
        includeRoutes: [
            'employees',
        ]
    },
    {
        id: "6",
        title: "Settings",
        icon: "GearIcon",
        items: [
            {
                title: 'Currency',
                url: '/settings/currency',
                icon: "CurrencyCircleDollarIcon",
                includeRoutes: [
                    'currency.index'
                ]
            },
            {
                title: 'Options',
                url: '/settings',
                icon: "GearSixIcon",
                includeRoutes: [
                    'settings.index',
                ]
            },
        ],
        includeRoutes: [
            'settings',
            'currency',
        ]
    }
]

export const navigationItems = {
    sideNav: [...sidebarNav],
}
