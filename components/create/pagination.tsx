import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { PAGE_SIZE } from "@/const/consts";

interface PaginationContainerProps {
    currentPage: number,
    totalCount: number,
    onPageChange: (page: number) => void
}

export default function PaginationContainer({ currentPage, totalCount, onPageChange}: PaginationContainerProps) {
    const totalPages = Math.ceil(totalCount / PAGE_SIZE);

    if (!totalCount || totalCount <= 0 ||totalPages <= 1) return null;

    return (
        <Pagination>
            <PaginationContent>
                {currentPage > 1 && (
                    <PaginationItem
                        onClick={(e) => {
                            e.preventDefault();
                            if (currentPage > 1) 
                                onPageChange(currentPage - 1)
                        }}
                        
                        >
                        <PaginationPrevious 
                            className="hover:bg-amber-500 hover:text-black cursor-pointer" 
                        />
                    </PaginationItem>
                )}
                {[...Array(totalPages)].map((_, index) => {
                    const page = index + 1;

                    if (
                        page === 1 || 
                        page === totalPages || 
                        (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                        return (
                            <PaginationItem key={page}>
                                <PaginationLink
                                    className={page === currentPage 
                                        ? "bg-indigo-950 hover:bg-indigo-950 hover:text-white text-white cursor-default" 
                                        : "hover:bg-amber-500 hover:text-black cursor-pointer"}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        onPageChange(page)
                                    }}
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
                            <PaginationEllipsis key={page} />
                        )
                    }
                })}
                {currentPage < totalPages && (
                    <PaginationItem
                        onClick={(e) => {
                            e.preventDefault();
                            if (currentPage < totalPages) 
                                onPageChange(currentPage + 1)
                        }}
                    >
                        <PaginationNext 
                            className="hover:bg-amber-500 hover:text-black cursor-pointer" 
                        />
                    </PaginationItem>
                )}
            </PaginationContent>
        </Pagination>
    )
}