import { lazy } from "react";

const ListItem = lazy(() => import("./ListItem"));
const Pagination = lazy(() => import("../UI/Pagination"));

export default function List({ items, setPageNo, limit, onDelete }) {
    const pageCount = Math.ceil(items.totalCount / limit);

    const onPageChange = (event) => {
        setPageNo(event.selected + 1);
        window.scrollTo({
            left: 0,
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <>
            {items?.list.map((item) => (
                <ListItem key={item.id} item={item} onDelete={onDelete} />
            ))}
            <div className="flex items-center justify-center pb-10 pt-5">
                <Pagination pageCount={pageCount} onPageChange={onPageChange} />
            </div>
        </>
    );
}
