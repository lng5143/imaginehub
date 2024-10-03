import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { PAGE_SIZE } from "@/const/imagine-box-consts";

export default function PaginationContainer({ currentPage, totalCount, onClick}) {

    totalCount = 45;
    const totalPages = Math.ceil(totalCount / PAGE_SIZE);
    console.log([...Array(totalPages)])

    if (totalPages <= 1) return null;

    return (
        <Pagination>
            <PaginationContent>
                <PaginationContent>
                    <PaginationPrevious />
                </PaginationContent>
                {[...Array(totalPages).map((_, index) => {
                    const page = index + 1;

                    if (
                        page === 1 || 
                        page === totalPages || 
                        (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                        return (
                            <PaginationItem key={page}>
                                <PaginationLink
                                    onClick={() => onClick(page)}
                                >
                                    {page}
                                </PaginationLink>
                            </PaginationItem>
                        )
                    } else if (
                        (page === currentPage - 2 && currentPage > 3) ||
                        (page === currentPage + 2 && currentPage < totalPages - 2)
                    ) {
                        return (
                            <PaginationEllipsis />
                        )
                    }
                })]}
                <PaginationItem>
                    <PaginationNext />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}