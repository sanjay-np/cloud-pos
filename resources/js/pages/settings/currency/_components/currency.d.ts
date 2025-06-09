import { type Pagination } from "@/types";

export interface CurrencyColumnProps {
    id: number;
    name: string;
    label: string;
    is_current: boolean;
}

export interface CurrencyIndexProps {
    currencies: CurrencyColumnProps[];
    pagination: Pagination;
}
