export interface customerForm {
    name: string,
    phone: string,
    email: string,
    address: string,
    whatsapp: string,
    status: string,
    avatar: File | null | string
}

export interface customer {
    id: number,
    name: string,
    phone: string,
    email: string,
    status: string,
}

export interface customersPagination {
    current_page: number,
    data: customer[],
    first_page_url: string,
    from: number,
    next_page_url: string | null,
    path: string,
    per_page: number,
    prev_page_url: string | null,
    to: number,
}

export interface customerItem {
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