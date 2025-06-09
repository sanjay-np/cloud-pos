import { type Pagination } from "@/types";


export interface SaleColumnProps {
    id: number;
    reference: string;
    date: string;
    customer: string;
    products: string[];
    total_amount: number;
    payment_status: string;
}

export interface SaleIndexProps {
    sales: SaleColumnProps[];
    pagination: Pagination;
    currencySymbol: string;
}
