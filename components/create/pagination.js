import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { PAGE_SIZE } from "@/const/imagine-box-consts";

export default function PaginationContainer({ currentPage, totalCount, onClick}) {

    currentPage = 1;
    totalCount = 200;
    const totalPages = Math.ceil(totalCount / PAGE_SIZE);
    console.log([...Array(totalPages)])

    if (totalPages <= 1) return null;

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious className="hover:border hover:border-gray-800 cursor-pointer" />
                </PaginationItem>
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
                                        ? "bg-gray-800 text-white hover:bg-gray-800 hover:text-white" 
                                        : "hover:border hover:border-gray-800 cursor-pointer"}
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
                            <PaginationEllipsis key={page} />
                        )
                    }
                })}
                <PaginationItem>
                    <PaginationNext className="hover:border hover:border-gray-800 cursor-pointer" />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}