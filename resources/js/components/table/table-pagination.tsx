import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";

type PaginatorProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (pageNumber: number) => void;
    showPreviousNext: boolean;
}

export default function TablePagination({
    currentPage,
    totalPages,
    onPageChange,
    showPreviousNext,
}: PaginatorProps) {

    return (
        <Pagination>
            <PaginationContent>
                {showPreviousNext && totalPages ? (
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() => onPageChange(currentPage - 1)}
                        />
                    </PaginationItem>
                ) : null}

                {showPreviousNext && totalPages ? (
                    <PaginationItem>
                        <PaginationNext
                            onClick={() => onPageChange(currentPage + 1)}
                        />
                    </PaginationItem>
                ) : null}
            </PaginationContent>
        </Pagination>
    )
}
