import ReactPaginate from "react-paginate";
import { GrLinkPrevious, GrLinkNext } from "react-icons/gr";

export default function Pagination({ pageCount, onPageChange }) {
    if (pageCount === 1) return null;

    return (
        <ReactPaginate
            previousLabel={<GrLinkPrevious size={18} />}
            nextLabel={<GrLinkNext size={18} />}
            breakLabel={"..."}
            pageCount={pageCount}
            onPageChange={onPageChange}
            containerClassName="flex"
            pageClassName={`flex items-center justify-center m-1`}
            pageLinkClassName={`border border-secondary hover:bg-secondary hover:text-white px-3 py-1.5 rounded-sm cursor-pointer`}
            previousClassName={`flex items-center justify-center overflow-hidden m-1`}
            nextClassName={`flex items-center justify-center overflow-hidden m-1`}
            previousLinkClassName={`border border-secondary hover:bg-secondary hover:text-white px-1.5 py-2 rounded-sm cursor-pointer`}
            nextLinkClassName={`border border-secondary hover:bg-secondary hover:text-white px-1.5 py-2 rounded-sm cursor-pointer`}
            activeLinkClassName="bg-secondary text-white px-3 py-1.5 rounded-sm cursor-pointer"
        />
    );
}
