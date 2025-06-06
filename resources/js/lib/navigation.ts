import { NavGroup, NavItem } from "@/types";

const sidebarNav: NavGroup[] = [
    {
        id: "1",
        title: "Dashboard",
        icon: "GaugeIcon",
        isGroup: false,
        url: "/dashboard",
    },
    {
        id: "2",
        title: "Operations",
        icon: "MathOperationsIcon",
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
            {
                title: "Adjustments",
                icon: "MathOperationsIcon",
                url: '/adjustments',
            },
            {
                title: "Invoices",
                icon: "ReceiptIcon",
                url: '/invoices',
            }
        ],
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
    },
    {
        id: "4",
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
