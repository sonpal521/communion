'use server'; 

import { revalidatePath } from 'next/cache'; // Helps revalidate cache for dynamic data updates.
import { connectToDatabase } from '@/lib/database'; // Function to establish a database connection.
import Event from '@/lib/database/models/event.model'; 
import Category from '@/lib/database/models/category.model';
import User from '@/lib/database/models/user.model'; 
import { handleError } from '@/lib/utils'; // Custom error handling utility.

// Finds a category by name using a case-insensitive search.
const getCategoryByName = async (name) => {
  return Category.findOne({ name: { $regex: name, $options: 'i' } });
};

// Populates event data with additional details about the organizer and category.
const populateEvent = (query) => {
  return query
    .populate({ 
      path: 'organizer', 
      model: User, 
      select: '_id firstName lastName username' // Select only these fields from the user model.
    })
    .populate({ 
      path: 'category', 
      model: Category, 
      select: '_id name' // Select only the category ID and name.
    });
};

// Creates a new event in the database.
export async function createEvent({ userId, event, path }) { 
  try {
    await connectToDatabase(); // Ensure database connection is established.

    // Validate required parameters.
    if (!userId) throw new Error("User ID is required");
    if (!event.categoryId) throw new Error("Category ID is required");

    // Create and save the new event in the database.
    const newEvent = await Event.create({ ...event, category: event.categoryId, organizer: userId });

    revalidatePath(path); // Clear the cache to reflect new event creation.

    return JSON.parse(JSON.stringify(newEvent)); // Convert the event object to a JSON-compatible format.
  } catch (error) {
    handleError(error); // Handle and log errors properly.
  }
}

// Retrieves a single event by its ID.
export async function getEventById(eventId) {
  try {
    await connectToDatabase(); // Ensure database connection.

    // Find the event and populate additional details.
    const event = await populateEvent(Event.findById(eventId));

    if (!event) throw new Error('Event not found'); // Throw an error if event doesn't exist.

    return JSON.parse(JSON.stringify(event)); // Return the event data in a JSON-friendly format.
  } catch (error) {
    handleError(error);
  }
}

// Updates an existing event.
export async function updateEvent({ userId, event, path }) {
  try {
    await connectToDatabase(); // Ensure database connection.

    // Find the event to be updated.
    const eventToUpdate = await Event.findById(event._id);

    // Check if the event exists and if the user is authorized to update it.
    if (!eventToUpdate || eventToUpdate.organizer.toHexString() !== userId) {
      throw new Error('Unauthorized or event not found');
    }

    // Update the event with new data.
    const updatedEvent = await Event.findByIdAndUpdate(
      event._id,
      { ...event, category: event.categoryId },
      { new: true } // Return the updated document.
    );

    revalidatePath(path); // Clear cache to reflect event updates.

    return JSON.parse(JSON.stringify(updatedEvent));
  } catch (error) {
    handleError(error);
  }
}

// Deletes an event by its ID.
export async function deleteEvent({ eventId, path }) {
  try {
    await connectToDatabase(); // Ensure database connection.

    // Find and delete the event by its ID.
    const deletedEvent = await Event.findByIdAndDelete(eventId);

    // If an event is deleted, revalidate the cache.
    if (deletedEvent) revalidatePath(path);
  } catch (error) {
    handleError(error);
  }
}

// Retrieves all events with optional filters, pagination, and sorting.
export async function getAllEvents({ query, limit = 6, page, category }) {
  try {
    await connectToDatabase(); // Ensure database connection.

    // If a search query is provided, use a regex to match event titles case-insensitively.
    const titleCondition = query ? { title: { $regex: query, $options: 'i' } } : {};

    // If a category is provided, find the category by name.
    const categoryCondition = category ? await getCategoryByName(category) : null;

    // Construct the query conditions based on title and category.
    const conditions = {
      $and: [titleCondition, categoryCondition ? { category: categoryCondition._id } : {}],
    };

    // Calculate the number of documents to skip for pagination.
    const skipAmount = (Number(page) - 1) * limit;

    // Fetch events that match the conditions with sorting, pagination, and population.
    const eventsQuery = Event.find(conditions)
      .sort({ createdAt: 'desc' }) // Sort by newest first.
      .skip(skipAmount)
      .limit(limit);

    // Populate additional event details.
    const events = await populateEvent(eventsQuery);

    // Count total matching events for pagination.
    const eventsCount = await Event.countDocuments(conditions);

    return { 
      data: JSON.parse(JSON.stringify(events)), 
      totalPages: Math.ceil(eventsCount / limit) // Calculate total pages for pagination.
    };
  } catch (error) {
    handleError(error);
  }
}

// Retrieves related events within the same category.
export async function getRelatedEventsByCategory({ categoryId, eventId, limit = 3, page = 1 }) {
  try {
    await connectToDatabase(); // Ensure database connection.

    // Calculate the number of documents to skip for pagination.
    const skipAmount = (Number(page) - 1) * limit;

    // Find events in the same category but exclude the current event.
    const conditions = { $and: [{ category: categoryId }, { _id: { $ne: eventId } }] };

    // Fetch related events with sorting, pagination, and population.
    const eventsQuery = Event.find(conditions)
      .sort({ createdAt: 'desc' }) // Sort by newest first.
      .skip(skipAmount)
      .limit(limit);

    // Populate additional event details.
    const events = await populateEvent(eventsQuery);

    // Count total related events for pagination.
    const eventsCount = await Event.countDocuments(conditions);

    return { 
      data: JSON.parse(JSON.stringify(events)), 
      totalPages: Math.ceil(eventsCount / limit) 
    };
  } catch (error) {
    handleError(error);
  }
}
