import { useSearchParams } from "react-router";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

const POST_PER_PAGE = 10;

export default function HomePagination({ page, postCount }: any) {
  const [searchParams, setSearchParams] = useSearchParams();
  const handlePagination = (targetPage: any) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("page", targetPage);
    setSearchParams(newSearchParams);
  };
  page = page ? +page : 1;
  const maxPage = Math.ceil(postCount / POST_PER_PAGE);

  return (
    <Pagination>
      <PaginationContent>
        {page > 1 && (
          <>
            <PaginationItem>
              <PaginationPrevious onClick={() => handlePagination(page - 1)} />
            </PaginationItem>
            {page > 3 && (
              <PaginationItem>
                <PaginationLink onClick={() => handlePagination(1)}>
                  1
                </PaginationLink>
              </PaginationItem>
            )}
            {page > 4 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            {page > 2 && (
              <PaginationItem>
                <PaginationLink onClick={() => handlePagination(page - 2)}>
                  {page - 2}
                </PaginationLink>
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationLink onClick={() => handlePagination(page - 1)}>
                {page - 1}
              </PaginationLink>
            </PaginationItem>
          </>
        )}
        <PaginationItem>
          <PaginationLink isActive>{page}</PaginationLink>
        </PaginationItem>
        {page < maxPage && (
          <>
            <PaginationItem>
              <PaginationLink onClick={() => handlePagination(page + 1)}>
                {page + 1}
              </PaginationLink>
            </PaginationItem>
            {maxPage - page > 1 && (
              <PaginationItem>
                <PaginationLink onClick={() => handlePagination(page + 2)}>
                  {page + 2}
                </PaginationLink>
              </PaginationItem>
            )}
            {maxPage - page > 3 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            {maxPage - page > 2 && (
              <PaginationItem>
                <PaginationLink onClick={() => handlePagination(maxPage)}>
                  {maxPage}
                </PaginationLink>
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationNext onClick={() => handlePagination(page + 1)} />
            </PaginationItem>
          </>
        )}
      </PaginationContent>
    </Pagination>
  );
}
