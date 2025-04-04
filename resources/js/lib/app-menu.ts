import {
    ArchiveIcon,
    BadgeDollarSignIcon,
    BookUserIcon,
    CalculatorIcon,
    ContactRoundIcon,
    FolderIcon,
    LayoutGridIcon,
    PackageIcon,
    ReceiptIcon,
    ReceiptTextIcon,
    Settings2Icon,
    SettingsIcon,
    SlidersIcon,
    TruckIcon
} from 'lucide-react';
import { type NavGroup, type NavItem } from '@/types';;

export const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        url: '/dashboard',
        icon: LayoutGridIcon,
    },
];

export const footerNavItems: NavGroup[] = [
    {
        title: 'Settings',
        icon: Settings2Icon,
        items: [
            {
                title: 'Appearance',
                url: '/settings/appearance',
                icon: SettingsIcon
            },
            {
                title: 'Currency',
                url: '/settings/currency',
                icon: SlidersIcon
            }
        ]
    },
];

export const productMenuItems: NavItem[] = [
    {
        title: "Attributes",
        url: '/attributes',
        icon: SlidersIcon
    },
    {
        title: "Brands",
        url: '/brands',
        icon: ArchiveIcon
    },
    {
        title: "Categories",
        url: '/categories',
        icon: FolderIcon
    },
    {
        title: 'Products',
        url: '/products',
        icon: PackageIcon
    },
    {
        title: "Suppliers",
        url: '/suppliers',
        icon: TruckIcon
    }

]

export const operationMenuItems: NavItem[] = [
    {
        title: "POS",
        url: '/pos',
        icon: CalculatorIcon
    },
    {
        title: 'Purchases',
        url: '/purchases',
        icon: ReceiptIcon
    },
    {
        title: 'Sales',
        url: '/sales',
        icon: BadgeDollarSignIcon
    },
    {
        title: "Expenses",
        url: '/expenses',
        icon: ReceiptTextIcon
    },
]

export const userMenuItems: NavItem[] = [
    {
        title: 'Customers',
        url: '/customers',
        icon: BookUserIcon
    }, {
        title: 'Employees',
        url: '/employees',
        icon: ContactRoundIcon
    }
]