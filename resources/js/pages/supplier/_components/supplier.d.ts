import { type Pagination } from "@/types";

export interface Brand {
    id: number;
    name: string;
}

export interface SupplierColumnProps {
    brand_items: Brand[] | null;
    contact_person: string;
    id: number;
    name: string;
    phone: string
}


export interface SupplierIndexProps {
    brands: Brand[];
    suppliers: SupplierColumnProps[];
    pagination: Pagination;
}