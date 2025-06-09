import * as PhosphorIcons from "@phosphor-icons/react";
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface BaseNavGroup {
    id: string;
    title: string;
    icon: keyof typeof PhosphorIcons;
    items?: NavItem[];
}

export interface GroupNav extends BaseNavGroup {
    isGroup: false;
    url: string;
}

export interface NonGroupNav extends BaseNavGroup {
    isGroup: true;
    url?: string;
}

export type NavGroup = GroupNav | NonGroupNav;

export interface NavItem {
    title: string;
    url: string;
    icon?: keyof typeof PhosphorIcons | null;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    currencySymbol: string;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Pagination {
    current_page: number;
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    next_page_url: string;
    path: string;
    per_page: number;
    prev_page_url: null | string;
    to: number;
    total: number;
}

export type Mode = "add" | "edit" | "view" | null
