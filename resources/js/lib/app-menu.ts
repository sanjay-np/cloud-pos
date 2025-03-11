import {
    ArchiveIcon,
    BadgeDollarSignIcon,
    BookUserIcon,
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
import { type NavItem } from '@/types';

export const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        url: '/dashboard',
        icon: LayoutGridIcon,
    },
];

export const footerNavItems: NavItem[] = [
    {
        title: 'Settings',
        url: 'https://github.com/laravel/react-starter-kit',
        icon: Settings2Icon,
    },
    {
        title: 'Options',
        url: 'https://laravel.com/docs/starter-kits',
        icon: SettingsIcon,
    },
];

export const productMenuItems: NavItem[] = [
    {
        title: "Attributes",
        url: '/products',
        icon: SlidersIcon
    },
    {
        title: "Brands",
        url: '/products',
        icon: ArchiveIcon
    },
    {
        title: "Categories",
        url: '/products',
        icon: FolderIcon
    },
    {
        title: 'Products',
        url: '/products',
        icon: PackageIcon
    },
    {
        title: "Suppliers",
        url: '/products',
        icon: TruckIcon
    }

]

export const operationMenuItems: NavItem[] = [
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