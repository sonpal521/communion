"use client";

import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getAllEvents } from "@/lib/actions/event.actions";
import Image from "next/image";
import Link from "next/link";
import { formatDateTime } from "@/lib/utils";

import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Avatar } from "./ui/avatar";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

const testimonials = [
  {
    id: 1,
    name: "John Doe",
    image: "/assets/images/test1.jpg",
    feedback: "This product is amazing! It has changed the way I work.",
    rating: 5,
  },
  {
    id: 2,
    name: "Jane Smith",
    image: "/assets/images/test3.jpg",
    feedback: "Highly recommend it! Super user-friendly and effective.",
    rating: 4,
  },
  {
    id: 3,
    name: "Alex Mccarthy",
    image: "/assets/images/test2.jpg",
    feedback: "Absolutely love it! The design and features are top-notch.",
    rating: 5,
  },
];
const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getAllEvents({ page: 1, limit: 5 });
        setEvents(response?.data || []);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <>
      <section className="bg-black text-white py-16 px-6 md:px-12 lg:px-24">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold">Upcoming Events</h2>
          <p className="text-gray-400 mt-2">
            Stay updated with the latest events happening around you
          </p>
        </div>

        <div className="relative">
          <Carousel>
            <CarouselPrevious className="left-[-10px] md:left-[-40px] text-black hover:text-indigo-500" />
            <CarouselNext className="right-[-10px] md:right-[-40px] text-black hover:text-indigo-500" />

  
            <CarouselContent className="flex gap-2 ml-4 mr-4">
            {loading
  ? Array.from({ length: 3 }).map((_, index) => (
      <CarouselItem
        key={index} // Ensure unique key
        className="md:basis-1/2 lg:basis-1/3 p-4"
      >
        <Skeleton className="h-[500px] w-full bg-gray-700 rounded-lg" />
      </CarouselItem>
    ))
    : events.length > 0
    ? events.map((event) => (
        <CarouselItem
          key={event.id || event._id} // ✅ Unique key for Event
          className="md:basis-1/2 lg:basis-1/3 p-4"
        >
          
            <div className="bg-gray-900 rounded-lg h-[500px] overflow-hidden shadow-lg hover:scale-105 transition-transform">
              <Image
                src={event.imageUrl || "/assets/images/placeholder.png"}
                alt={event.title}
                width={500}
                height={500}
                className=" h-[320px] object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{event.title}</h3>
                <p className="p-medium-16 flex p-medium-18 mt-4 text-grey-500">
                  <Image
                    src="/assets/icons/calendar.svg"
                    className="mr-2"
                    alt="clock"
                    width={20}
                    height={20}
                  />
                  {formatDateTime(event.startDateTime).dateTime}
                </p>

                <Link href={`/events/${event._id}`}>
                  <Button className="cursor-pointer h-12 w-full mt-4 hover:bg-white bg-white transition-all">
                    <p className="text-black text-base p-4">Event Details</p>
                    <Image
                      src="/assets/icons/arrow.svg"
                      alt="search"
                      width={10}
                      height={10}
                    />
                  </Button>
                </Link>
              </div>
            </div>
        
        </CarouselItem>
      ))
    : (
        <p className="text-center w-full text-gray-400">No upcoming events</p>
      )}


            </CarouselContent>
          </Carousel>
        </div>
      </section>

      <section className="bg-white">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-100 py-16 px-4 sm:px-8 lg:px-16 text-center">
          <h2 className="text-3xl  font-bold text-gray-800 mb-4">
            Trusted by Over 100+ Active Global Users
          </h2>
          <p className="text-base text-gray-400 mb-8">
            Join a growing community of over 100 users worldwide who trust us to
            connect, engage, and thrive together.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                whileHover={{ scale: 1.05 }}
                className="p-4"
              >
                <Card className="shadow-lg rounded-2xl p-6 bg-white flex flex-col items-center text-center">
                <Avatar className="w-16 h-16 mb-4">
  <Image
    src={testimonial.image}
    alt="test"
    width={64}  // Set the correct size
    height={64}
    className="rounded-full"
  />
</Avatar>

                  <h3 className="text-xl font-semibold text-gray-700">
                    {testimonial.name}
                  </h3>
                  <p className="text-gray-500 my-2">{testimonial.feedback}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default UpcomingEvents;