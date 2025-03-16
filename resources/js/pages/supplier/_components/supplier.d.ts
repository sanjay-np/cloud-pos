export type Brand = {
    id: number,
    name: string
}

type PaginatedSupplierProps = {
    current_page: number,
    data: string[],
    first_page_url: string,
    from: number,
    next_page_url: string | null,
    path: string,
    per_page: number,
    prev_page_url: string | null,
    to: number,
}

export type SupplierIndexProps = {
    brands: Brand[],
    suppliers: PaginatedSupplierProps
}