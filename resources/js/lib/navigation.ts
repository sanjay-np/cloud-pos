import { NavGroup, NavItem } from "@/types";

const sidebarNav: NavGroup[] = [
    {
        id: "1",
        title: "Overview",
        icon: "CommandIcon",
        isGroup: true,
        items: [
            {
                title: 'Dashboard',
                url: '/dashboard',
                icon: "HouseIcon",
            },
            {
                title: "Daily Overivew",
                url: '/overview',
                icon: "SquaresFourIcon",
            },
        ],
        includeRoutes: ['dashboard']
    },
    {
        id: "2",
        title: "Operations",
        icon: "CardsThreeIcon",
        isGroup: true,
        items: [
            {
                title: 'POS',
                icon: "CashRegisterIcon",
                url: '/pos',
            },
            {
                title: 'Purchase',
                icon: "CoinsIcon",
                url: '/purchases',
            },
            {
                title: 'Sales',
                icon: "TagIcon",
                url: '/sales',
            },
            {
                title: 'Expenses',
                icon: "ReceiptXIcon",
                url: '/expenses',
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
        isGroup: true,
        items: [
            {
                title: 'Attributes',
                icon: "SlidersIcon",
                url: '/attributes',
            },
            {
                title: 'Brands',
                icon: "ArchiveIcon",
                url: '/brands',
            },
            {
                title: 'Categories',
                url: '/categories',
                icon: "FolderIcon",
            },
            {
                title: 'Products',
                url: '/products',
                icon: "PackageIcon",
            },
            {
                title: 'Suppliers',
                url: '/suppliers',
                icon: "TruckIcon",
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
        title: "Users",
        icon: "UserCircleIcon",
        isGroup: true,
        items: [
            {
                title: 'Customers',
                url: '/customers',
                icon: "UsersIcon"
            },
            {
                title: 'Employees',
                url: '/employees',
                icon: "IdentificationBadgeIcon"
            }
        ],
        includeRoutes: [
            'customers',
            'employees',
        ]
    },
    {
        id: "5",
        title: "Settings",
        icon: "GearIcon",
        isGroup: true,
        items: [
            {
                title: "Currency",
                url: '/settings/currency',
                icon: "CurrencyInrIcon",
            },
            {
                title: "App Options",
                url: '/settings/options/shop',
                icon: "GearIcon",
            },
        ],
        includeRoutes: [
            'settings',
            'currency',
        ]
    }
]

const footerNav: NavItem[] = [
    {
        title: "Help/Support",
        url: '/help',
        icon: "QuestionIcon",
    },
    {
        title: "Live Chat",
        url: '/live-chat',
        icon: "ChatsIcon"
    }
]


export const navigationItems = {
    sideNav: [...sidebarNav],
    footerNav: [...footerNav],
}
