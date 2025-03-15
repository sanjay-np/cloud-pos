export interface CustomerColumnProps {
    id: number;
    name: string;
    phone: string;
    email: string;
    status: string;
    avatar_url: string | null;
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

export interface PaginatedCustomerProps {
    current_page: number,
    data: CustomerColumnProps[],
    first_page_url: string,
    from: number,
    next_page_url: string | null,
    path: string,
    per_page: number,
    prev_page_url: string | null,
    to: number,
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