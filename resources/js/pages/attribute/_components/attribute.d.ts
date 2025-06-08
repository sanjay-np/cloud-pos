import { type Pagination } from "@/types";

export interface AttributeColumnProps {
    id: number;
    name: string;
    description: string | null;
    status: string;
    attributes: string[] | null
}

export interface AttributePageProps {
    attributes: AttributeColumnProps[],
    pagination: Pagination
}
