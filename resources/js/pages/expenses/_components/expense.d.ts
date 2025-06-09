import { type Pagination } from "@/types";

export interface ExpenseColumnProps {
    id: number;
    title: string;
    description: string;
    amount: number;
    date: string;
    status: string;
}

export interface ExpenseIndexProps {
    expenses: ExpenseColumnProps[];
    pagination: Pagination;
}
