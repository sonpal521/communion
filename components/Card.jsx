import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import DeleteConfirmation from "./DeleteConfirmation";
import { formatDateTime } from "@/lib/utils";
import { Button } from "./ui/button";

function Card({ event,  hidePrice }) {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const isEventCreator = userId === event.organizer._id.toString();

  return (
    <div className="group relative flex min-h-[380px] w-full max-w-[350px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px]">
      <Link
        href={`/events/${event._id}`}
        style={{ backgroundImage: `url(${event.imageUrl})` }}
        className="flex-center flex-grow bg-gray-50 bg-cover bg-center text-grey-500"
      />

      {isEventCreator && !hidePrice && (
        <div className="absolute right-2 top-2 flex flex-col gap-4 rounded-xl bg-white p-3  shadow-sm transition-all">
          <Link href={`/events/${event._id}/update`}>
            <Image src="/assets/icons/edit.svg" alt="edit" width={20} height={20} />
          </Link>
          <DeleteConfirmation eventId={event._id}  />
        </div>
      )}

      <div className="flex min-h-[230px] flex-col gap-3 p-5 md:gap-4">
      {!hidePrice && (
  <div className="flex gap-2">
    <span className="p-semibold-14  rounded-full bg-green-100 px-4 py-1 text-green-60 flex items-center">
      {event.isFree ? (
        <Image src="/assets/icons/free.svg" className="mr-2" alt="Free" width={20} height={20} />
      ) : (
        <Image src="/assets/icons/dollar.svg" className="mr-2" alt="Paid" width={20} height={20} />
      )}
      {event.isFree ? "FREE" : `${event.price}`}
    </span>
    <p className="p-semibold-14 flex rounded-full bg-grey-500/10 px-4 py-1 text-grey-500 line-clamp-1 items-center">
      <Image src="/assets/icons/category.svg" className="mr-2" alt="Category" width={20} height={20} />
      {event.category.name}
    </p>
  </div>
)}


       

        <Link href={`/events/${event._id}`}>
          <p className="p-medium-16 md:p-medium-20 line-clamp-2 text-xl font-bold flex-1 text-black">
            {event.title}
          </p>
        </Link>

        <p className="p-medium-16 flex p-medium-18 text-grey-500">
          <Image src="/assets/icons/calendar.svg" className="mr-2" alt="clock" width={20} height={20} />
          {formatDateTime(event.startDateTime).dateTime}
         

        </p>

       
        <div className=" mt-4 w-full">
          

        
            <Link href={`/events/${event._id}`} >
            <Button  className="cursor-pointer h-12 w-full ">
            <p className="text-primary-500 text-base p-4  ">Event Details</p>
            <Image src="/assets/icons/arrow.svg" alt="search" width={10} height={10} />
            </Button>
             
            </Link>
         
        </div>
      </div>
    </div>
  );
}

export default Card;
