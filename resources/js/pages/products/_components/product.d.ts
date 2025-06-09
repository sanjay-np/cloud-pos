import { type Pagination } from "@/types"

export interface ProductColumnProps {
    id: number;
    title: string;
    purchase_price: number;
    sale_price: number;
    image_url: string;
    stock_qty: number;
    status: string;
}

export interface ProductIndexProps {
    products: ProductColumnProps[];
    pagination: Pagination;
    currencySymbol: string;
}
