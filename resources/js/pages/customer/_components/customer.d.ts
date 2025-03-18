import { type Pagination } from "@/types";

export interface CustomerColumnProps {
    id: number;
    name: string;
    phone: string;
    email: string;
    status: string;
    avatar_url: string | null;
}

export interface CustomerPageProps {
    customers: CustomerColumnProps[];
    pagination: Pagination
}

export interface CustomerFormProps {
    name: string,
    phone: string,
    email: string,
    address: string,
    whatsapp: string,
    status: string,
    avatar: File | null | string
}

export interface CustomerResponseProps {
    id: number,
    name: string,
    phone: string,
    email: string,
    status: string,
    whatsapp: string | null,
    address: string | null,
    avatar: string | null,
    created_by: string,
}