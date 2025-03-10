export interface customerForm {
    name: string,
    phone: string,
    email: string,
    address: string,
    whatsapp: string,
    status: string,
}

export interface customer {
    id: number,
    name: string,
    phone: string,
    email: string,
    address: string,
    whatsapp: string,
    status: string,
    created_at: string,
    updated_at: string | null,
    deleted_at: string | null,
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