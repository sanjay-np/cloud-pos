import { type Pagination } from "@/types";

export interface EmployeeColumnProps {
    id: number;
    department: string | null;
    name: string;
    phone: string;
    joined_at: string;
    position: string;
    status: status;
    avatar_url: string | null;
}

export interface EmployeePageProps {
    employees: EmployeeColumnProps[];
    pagination: Pagination;
}

export interface EmployeeFormProps {
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


export interface EmployeeResponseProps {
    id: number;
    name: string;
}