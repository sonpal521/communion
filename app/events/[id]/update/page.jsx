import { getServerSession } from "next-auth";
import EventForm from "@/components/EventForm";
import { getEventById } from "@/lib/actions/event.actions";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // Correct import

const UpdateEvent = async ({ params }) => {
  try {
    const { id } = params; // Extract event ID from route parameters

    // Get authentication details using NextAuth
    const session = await getServerSession(authOptions);

    // Extract user ID from session
    const userId = session?.user?.id;

    // Fetch event details using ID
    const event = await getEventById(id);

    if (!event) {
      return <p className="wrapper text-center text-red-500">Event not found</p>;
    }

    return (
      <>
        {/* Page Header */}
        <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
          <h3 className="wrapper h3-bold text-center sm:text-left">Update Event</h3>
        </section>

        {/* Event Form */}
        <div className="wrapper my-8">
          <EventForm 
            type="Update" 
            event={event} 
            eventId={event._id} 
            userId={userId} 
          />
        </div>
      </>
    );
  } catch (error) {
    console.error("Error fetching event:", error);
    return <p className="wrapper text-center text-red-500">Error loading event. Please try again.</p>;
  }
};

export default UpdateEvent;
