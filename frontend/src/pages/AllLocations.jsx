import { lazy, useState } from "react";
import { Link } from "react-router-dom";
import useLocationService from "../hooks/useLocationService";
import { ITEMS_PER_PAGE } from "../constants/menuLists";

const List = lazy(() => import("../components/List/List"));
const Heading = lazy(() => import("../components/UI/Heading"));
const Paragraph = lazy(() => import("../components/UI/Paragraph"));

export default function AllMarkers() {
    const [pageNo, setPageNo] = useState(1);
    const { locations, deleteLocation } = useLocationService(pageNo, ITEMS_PER_PAGE);

    const onDelete = async (id) => {
        await deleteLocation(id);
    };

    return (
        <section className="min-h-[calc(100vh-230px)]">
            <Heading title="All Locations" customClass="pb-5" />
            {locations?.list?.length ? (
                <List
                    items={locations}
                    setPageNo={setPageNo}
                    limit={ITEMS_PER_PAGE}
                    onDelete={onDelete}
                />
            ) : (
                <div className="flex gap-2">
                    <Paragraph content="No Records found." />
                    <Link to="add-location">
                        <Paragraph
                            content="Add New Location"
                            customClass="text-secondary"
                        />
                    </Link>
                </div>
            )}
        </section>
    );
}
