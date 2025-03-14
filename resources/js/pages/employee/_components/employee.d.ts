export type employeeTableProps = {
    id: number;
    department: string | null;
    name: string;
    phone: string;
    joined_at: string;
    position: string;
    status: status;
}

export type EmployeeFormProps = {
    name: string,
    phone: string,
    address: string,
    joined_at: string | null,
    department: string,
    position: string,
    document_type: string,
    document_number: string,
    avatar: null | string | File,
    document_files: string[],
    status: string,
}


export type PaginatiedEmployeeProps = {
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

export type EmployeeResponseProps = {
    id: number;
    name: string;
}