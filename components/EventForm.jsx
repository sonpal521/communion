"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { eventFormSchema } from "@/lib/validator";
import { eventDefaultValues } from "@/constants";
import Dropdown from "./Dropdown";
import { Textarea } from "@/components/ui/textarea";
import FileUploader from "./FileUplaoder";
import { useState } from "react";
import Image from "next/image";
import DatePicker from "react-datepicker";
import { useUploadThing } from "@/lib/uploadthing";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/navigation";
import { createEvent, updateEvent } from "@/lib/actions/event.actions";
import { Checkbox } from "./ui/checkbox";
import toast from "react-hot-toast";


const EventForm = ({ userId, type, event, eventId }) => {
  // State to store uploaded files
  const [files, setFiles] = useState([]);

  // Set initial values for the form
  // If an event exists and the form type is "Create", convert date fields to Date objects
  const initialValues = event && type === "Create"
    ? {
        ...event,
        startDateTime: new Date(event.startDateTime),
        endDateTime: new Date(event.endDateTime),
      }
    : eventDefaultValues; // If no event, use default values

  // Next.js Router for navigation
  const router = useRouter();

  // File upload function from useUploadThing
  const { startUpload } = useUploadThing("imageUploader");

  // Initialize form with validation and default values
  const form = useForm({
    resolver: zodResolver(eventFormSchema), // Zod schema for form validation
    defaultValues: initialValues, // Pre-fill form with existing values or defaults
  });

  // Function to handle form submission
  const onSubmit = async (values) => {
    let uploadedImageUrl = values.imageUrl; // Keep the existing image URL if no new file is uploaded

    // If new files are uploaded, start the upload process
    if (files.length > 0) {
      const uploadedImages = await startUpload(files);
      if (!uploadedImages) return; // Exit if upload fails
      uploadedImageUrl = uploadedImages[0].url; // Get the uploaded image URL
    }

    try {
      if (type === "Create") {
        // Call the function to create a new event
        const newEvent = await createEvent({
          event: { ...values, imageUrl: uploadedImageUrl }, // Include the new image URL
          userId,
          path: "/",
        });

        if (newEvent) {
          toast.success("Event created Successfully"); // Show success message
          form.reset(); // Reset the form
          router.push("/events"); // Navigate to events page
        }
      } else if (type === "Update" && eventId) {
        // Call the function to update an existing event
        const updatedEvent = await updateEvent({
          userId,
          event: { ...values, imageUrl: uploadedImageUrl, _id: eventId }, // Include the image URL & event ID
          path: `/events/${updatedEvent._id}`, // Navigate to the updated event page
        });

        if (updatedEvent) {
          toast.success("Event Upadated Successfully");
          form.reset(); // Reset the form
          router.push("/events"); // Navigate to events page
        }
      } else {
        router.back(); // If neither Create nor Update, go back to the previous page
      }
    } catch (error) {
      toast.error("SomeThing went wrong");

      console.error(error); // Log any errors
    }
  };


  return (
    <div className="max-w-3xl mx-auto p-6 bg-white border-2 shadow-2xl rounded-2xl ">
      <h2 className="text-2xl font-semibold text-blue-800 text-center mb-6 md:mb-12">{type} Event</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
          {/* Title & Category */}
          <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Event Title" {...field} className="input-field border-1 border-gray-400 bg-gray-100 "/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categoryId"
              

              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Dropdown onChangeHandler={field.onChange} value={field.value}  />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Description & Image Upload */}
          <div className="grid grid-cols-1 md:grid-cols-2  rounded-lg gap-4">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea placeholder="Event Description" {...field} className="textarea bg-gray-100 border border-gray-400 rounded-lg h-40 md:h-60" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FileUploader onFieldChange={field.onChange} imageUrl={field.value} setFiles={setFiles}    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Location */}
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex items-center border-1 border-gray-400  rounded-md">
                  
                    <Input placeholder="Event location or Online" {...field} className="input-field h-12 w-full bg-gray-100" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Start & End Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="startDateTime"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <DatePicker
                      selected={field.value}
                      onChange={(date) => field.onChange(date)}
                      showTimeSelect
                      dateFormat="MM/dd/yyyy h:mm aa"
                      className="input-field w-full bg-gray-100  h-12  border-1 border-gray-400 rounded-lg p-2"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endDateTime"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <DatePicker
                      selected={field.value}
                      onChange={(date) => field.onChange(date)}
                      showTimeSelect
                      dateFormat="MM/dd/yyyy h:mm aa"
                      className="input-field w-full bg-gray-100  h-12  border-1 border-gray-400 rounded-lg p-2"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Price & URL */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center space-x-3 bg-gray-100 p-3 border-1 border-gray-400 rounded-lg">
                      
                      <Input type="number" placeholder="Price" {...field} className="bg-transparent border-1 border-gray-400  w-full" />
                      <label htmlFor="isFree" className="whitespace-nowrap pr-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Free Ticket</label>
                      <FormField
                        control={form.control}
                        name="isFree"
                        render={({ field }) => (
                          <Checkbox onCheckedChange={field.onChange} checked={field.value} className="h-5 w-5 border-1 border-gray-400" />
                        )}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center space-x-3 bg-gray-100 p-3 border-1 border-gray-400 rounded-lg">
                      <Image src="/assets/icons/link.svg" alt="link" width={24} height={24} />
                      <Input placeholder="Event URL" {...field} className="bg-transparent w-full" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Submit Button */}
          <Button type="submit" size="lg" disabled={form.formState.isSubmitting} className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3">
            {form.formState.isSubmitting ? "Submitting..." : `${type} Event`}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default EventForm;
