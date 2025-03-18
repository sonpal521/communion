"use client";

import React from "react";
import Card from "./Card";
import Pagination from "./Pagination";


const Collection = ({
  data = [], // Ensure 'data' is always an array
  emptyTitle,
  emptyStateSubtext,
  page,
  totalPages = 0,
  collectionType,
  urlParamName,
}) => {
  return (
    <>
      {data?.length > 0 ? ( 
        <div className="flex flex-col items-center gap-10">
          {/* Grid Layout for Event Cards */}
          <ul className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10">
            {data.map((event) => {
              const hasOrderLink = collectionType === "Events_Organized";
              const hidePrice = collectionType === "My_Tickets";

              return (
                <li key={event._id} className="flex justify-center">
                  {/* Event Card Component */}
                  <Card event={event} hasOrderLink={hasOrderLink} hidePrice={hidePrice} />
                </li>
              );
            })}
          </ul>

          {/* Pagination Component (only if there are multiple pages) */}
          {totalPages > 1 && <Pagination urlParamName={urlParamName} page={page} totalPages={totalPages} />}
        </div>
      ) : (
        // Empty State (if no events are found)
        <div className="flex-center wrapper min-h-[200px] w-full flex-col gap-3 rounded-[14px] bg-grey-50 py-28 text-center">
          <h3 className="p-bold-20 md:h5-bold">{emptyTitle}</h3>
          <p className="p-regular-14">{emptyStateSubtext}</p>
        </div>
      )}
    </>
  );
};

export default Collection;
