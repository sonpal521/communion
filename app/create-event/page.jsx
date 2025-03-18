"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import EventForm from "@/components/EventForm";

function CreateEvent() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect unauthorized users
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-medium text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!session) {
    router.push("/login");
    return null;
  }

  return (
    <div
      className=" 
    bg-gradient-to-b my-10 from-white to-gray-100"
    >
      <EventForm type="Create" userId={session.user.id} />
    </div>
  );
}

export default CreateEvent;
