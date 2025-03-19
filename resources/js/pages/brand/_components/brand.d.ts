import { type Pagination } from "@/types";

export interface BrandColumnProps {
    description: string | null;
    id: number;
    image_url: string | null;
    name: string;
}

export interface BrandIndexProps {
    brands: BrandColumnProps[],
    pagination: Pagination
}