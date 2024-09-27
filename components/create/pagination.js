import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"

export default function PaginationContainer({ currentPage, total, onClick}) {

    if (total <= 1) return null;

    return (
        <Pagination>
            <PaginationContent>
                <PaginationContent>
                    <PaginationPrevious />
                </PaginationContent>
                <PaginationItem>
                    <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                {}
                <PaginationItem>
                    <PaginationLink href="#">{total}</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationNext />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}