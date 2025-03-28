export type Product = {
    id: number;
    title: string;
    qty: number;
    price: number
}

export type PurchaseFormFieldProps = {
    date: string;
    products: Product[];
    supplier_id: string | number;
    tax_percentage: number;
    tax_amount: number;
    discount_amount: number;
    shipping_amount: number;
    total_amount: number;
    paid_amount: number;
    due_amount: number;
    status: string;
    payment_status: string;
    payment_method: string;
    note: string;
}