"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import CategoryFilter from "@/components/CategoryFilter";
import Collection from "@/components/Collection";
import Search from "@/components/Search";
import { getAllEvents } from "@/lib/actions/event.actions";
import { Skeleton } from "@/components/ui/skeleton";

function EventsPageContent() {
  const searchParams = useSearchParams();
  const [events, setEvents] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(true);

  // Extract parameters safely
  const page = Number(searchParams.get("page")) || 1;
  const searchText = searchParams.get("query") || "";
  const category = searchParams.get("category") || "";

  useEffect(() => {
    let isMounted = true;

    const fetchEvents = async () => {
      setLoading(true);
      setShowSkeleton(true);

      const MINIMUM_SKELETON_TIME = 1000;
      const fetchStartTime = Date.now();

      try {
        const fetchedEvents = await getAllEvents({
          query: searchText,
          category,
          page,
          limit: 6,
        });

        const elapsedTime = Date.now() - fetchStartTime;
        const remainingTime = Math.max(0, MINIMUM_SKELETON_TIME - elapsedTime);

        setTimeout(() => {
          if (isMounted) {
            setEvents(fetchedEvents);
            setShowSkeleton(false);
            setLoading(false);
          }
        }, remainingTime);
      } catch (error) {
        console.error("Error fetching events:", error);
        if (isMounted) {
          setShowSkeleton(false);
          setLoading(false);
        }
      }
    };

    fetchEvents();

    return () => {
      isMounted = false;
    };
  }, [searchText, category, page]);

  return (
    <main className="container mx-auto px-4 md:px-8 lg:px-16 py-10">
      {/* Hero Section */}
      <section className="text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
          Trusted by <span className="text-indigo-600">Thousands</span> of Event Organizers
        </h2>
        <p className="mt-3 text-gray-600 text-lg md:text-xl">
          Find and join exciting events happening near you!
        </p>
      </section>

      {/* Search and Category Filter */}
      <div className="mt-8 flex flex-col md:flex-row justify-between items-center mx-12">
        <Search className="w-full md:w-1/2 mb-4 md:mb-0" />
        <CategoryFilter className="w-full md:w-1/2" />
      </div>

      {/* Events Collection */}
      <section className="mt-12">
        {showSkeleton ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="p-4 bg-white rounded-lg shadow-md">
                <Skeleton className="w-full h-48 rounded-md" />
                <Skeleton className="w-3/4 h-6 mt-4 rounded-md" />
                <Skeleton className="w-1/2 h-4 mt-2 rounded-md" />
                <Skeleton className="w-full h-12 mt-4 rounded-md" />
                <Skeleton className="w-1/2 h-10 mt-6 rounded-md" />
              </div>
            ))}
          </div>
        ) : loading ? (
          <p className="text-center text-gray-500">Loading events...</p>
        ) : (
          <Collection
            data={events?.data}
            emptyTitle="No Events Found"
            emptyStateSubtext="Come back later"
            collectionType="All_Events"
            limit={3}
            page={page}
            totalPages={events?.totalPages}
          />
        )}
      </section>
    </main>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<p className="text-center text-gray-500">Loading page...</p>}>
      <EventsPageContent />
    </Suspense>
  );
}
