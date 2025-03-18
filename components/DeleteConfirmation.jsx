"use client"; 

import { useTransition } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { deleteEvent } from "@/lib/actions/event.actions";


function DeleteConfirmation ({ eventId })  {
  const pathname = usePathname(); // Gets the current path in Next.js
  const [isPending, startTransition] = useTransition(); // Handles async state updates

  return (
    <AlertDialog>
    
      <AlertDialogTrigger>
        <Image src="/assets/icons/delete.svg" alt="delete" className="cursor-pointer" width={20} height={20} />
      </AlertDialogTrigger>

      {/* Modal Content */}
      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to delete?</AlertDialogTitle>
          <AlertDialogDescription className="p-regular-16 text-grey-600">
            This will permanently delete this event.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {/* Action Buttons */}
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          {/* Delete Button */}
          <AlertDialogAction
            onClick={() =>
              startTransition(async () => {
                await deleteEvent({ eventId, path: pathname }); // Calls delete event function
              })
            }
          >
            {isPending ? "Deleting..." : "Delete"} {/* Shows loading state if deleting */}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteConfirmation;
