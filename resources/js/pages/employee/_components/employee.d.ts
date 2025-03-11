export type employeeForm = {
    name: string,
    phone: string,
    address: string,
    joined_at: string | null,
    department: string,
    position: string,
    document_type: string,
    document_number: string,
    avatar: null,
    document_files: string[],
    status: string,
}
export type employee = {
    id: number,
    department: string | null,
    name: string,
    phone: string,
    position: string,
    status: status
}


export type employeesPagination = {
    current_page: number,
    data: employee[],
    first_page_url: string,
    from: number,
    next_page_url: string | null,
    path: string,
    per_page: number,
    prev_page_url: string | null,
    to: number,
}