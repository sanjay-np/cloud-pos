import { type Pagination } from "@/types";

export interface ParentCategory {
    label: string,
    value: string
}

export interface CategoryColumnProps {
    description: string | null;
    id: number;
    image_url: string | null;
    name: string;
    parent_id: number | null;
    parent: {
        id: number;
        name: string
    } | null;
    status: string
}

export interface CategoryIndexProps {
    categories: CategoryColumnProps[];
    parentCategories: ParentCategory[];
    pagination: Pagination;
}