"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Collection from "@/components/Collection";
import { Skeleton } from "@/components/ui/skeleton";
import { getEventById, getRelatedEventsByCategory } from "@/lib/actions/event.actions";
import { formatDateTime } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const EventDetails = ({ params, hidePrice }) => {
  const { id } = params; // Correct extraction of `id`
  const searchParams = useSearchParams();
  const [page, setPage] = useState(1);

  const [event, setEvent] = useState(null);
  const [relatedEvents, setRelatedEvents] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setPage(Number(searchParams.get("page")) || 1);
  }, [searchParams]);

  useEffect(() => {
    let isMounted = true;

    const fetchEventDetails = async () => {
      setLoading(true);
      try {
        const eventData = await getEventById(id);
        if (!isMounted) return;
        setEvent(eventData);

        if (eventData?.category?._id) {
          const relatedData = await getRelatedEventsByCategory({
            categoryId: eventData.category._id,
            eventId: eventData._id,
            page,
          });

          if (isMounted) setRelatedEvents(relatedData);
        }
      } catch (error) {
        console.error("Error fetching event details:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchEventDetails();

    return () => {
      isMounted = false;
    };
  }, [id, page]);

  return (
    <div className="flex flex-col gap-12">
      {/* Event Details Section */}
      <section className="bg-primary-50 bg-dotted-pattern py-12 px-4 sm:px-8 md:px-16 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {loading ? (
            <Skeleton className="w-full h-[300px] md:h-[500px] rounded-lg shadow-lg" />
          ) : (
            event && (
              <Image
                src={event.imageUrl}
                alt="Event Image"
                width={600}
                height={400}
                className="w-full h-full min-h-[300px] object-cover rounded-lg shadow-lg"
              />
            )
          )}
          <div className="flex flex-col gap-6 p-5 md:p-10 bg-white rounded-lg shadow-md">
            {loading ? <Skeleton className="w-3/4 h-8" /> : event && <h2 className="text-2xl lg:text-3xl font-bold">{event.title}</h2>}
            <div className="flex flex-wrap items-center gap-3">
              {loading ? <Skeleton className="w-24 h-8 rounded-full" /> : event && !hidePrice && (
                <div className="flex gap-2">
                  <span className="p-semibold-14 rounded-full bg-green-100 px-4 py-1 text-green-600 flex items-center">
                    <Image src={event.isFree ? "/assets/icons/free.svg" : "/assets/icons/dollar.svg"} className="mr-2" alt="Price" width={20} height={20} />
                    {event.isFree ? "FREE" : `$${event.price}`}
                  </span>
                </div>
              )}
              {loading ? <Skeleton className="w-32 h-8 rounded-full" /> : event && (
                <p className="p-semibold-14 flex rounded-full bg-grey-500/10 px-4 py-1 text-grey-500">
                  <Image src="/assets/icons/category.svg" className="mr-2 ml-4" alt="Category" width={20} height={20} />
                  {event.category?.name}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-5 text-gray-700">
              <div className="flex items-center gap-3">
                <Image src="/assets/icons/calendar.svg" alt="calendar" width={28} height={28} />
                {loading ? <Skeleton className="w-56 h-6" /> : event && (
                  <p>
                    {formatDateTime(event.startDateTime).dateOnly} - {formatDateTime(event.startDateTime).timeOnly} to{" "}
                    {formatDateTime(event.endDateTime).dateOnly} - {formatDateTime(event.endDateTime).timeOnly}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-3">
                <Image src="/assets/icons/location.svg" alt="location" width={28} height={28} />
                {loading ? <Skeleton className="w-40 h-6" /> : event && <p>{event.location}</p>}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-semibold text-gray-800">What You'll Learn:</h3>
              {loading ? <Skeleton className="w-full h-20" /> : event && <p className="text-gray-600">{event.description}</p>}
            </div>
            <div className="flex flex-wrap w-full justify-center items-center mt-5">
              {loading ? <Skeleton className="w-40 h-12 rounded-md" /> : event && (
                <Button className="cursor-pointer h-12 mt-1 w-full lg:w-1/2 mr-6">
                  <Image src="/assets/icons/tic.svg" alt="ticket" width={20} height={20} />
                  <p className="text-primary-500 text-base p-2">Confirm Free Ticket</p>
                  <Image src="/assets/icons/arrow.svg" alt="arrow" width={10} height={10} />
                </Button>
              )}
              {loading ? <Skeleton className="w-40 h-12 rounded-md" /> : event?.url && (
                <Link href={event.url} target="_blank" rel="noopener noreferrer">
                  <Button className="h-12 mt-1 cursor-pointer w-full">
                    <p className="text-primary-500 text-base p-4">View Video</p>
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Related Events Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Related Events</h2>
        {loading ? (
          <div className="flex gap-6">
            {[...Array(3)].map((_, index) => (
              <Skeleton key={index} className="w-80 h-64 rounded-md" />
            ))}
          </div>
        ) : (
          <Collection
            data={relatedEvents?.data}
            emptyTitle="No Events Found"
            emptyStateSubtext="Come back later"
            collectionType="All_Events"
            limit={3}
            page={page}
            totalPages={relatedEvents?.totalPages}
          />
        )}
      </section>
    </div>
  );
};

export default EventDetails;
