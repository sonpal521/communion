import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import qs from "query-string";

/**
 * Utility function to merge Tailwind CSS classes dynamically.
 * Uses `clsx` for conditional class handling and `twMerge` to merge them properly.
 
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Formats a given date string into different representations.

export const formatDateTime = (dateString) => {
  // Date & time format options
  const dateTimeOptions = {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true, // 12-hour format
  };

  // Date-only format
  const dateOptions = {
    weekday: "short",
    month: "short",
    year: "numeric",
    day: "numeric",
  };

  // Time-only format
  const timeOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  // Convert the date string into different formats
  const formattedDateTime = new Date(dateString).toLocaleString(
    "en-US",
    dateTimeOptions
  );
  const formattedDate = new Date(dateString).toLocaleString(
    "en-US",
    dateOptions
  );
  const formattedTime = new Date(dateString).toLocaleString(
    "en-US",
    timeOptions
  );

  return {
    dateTime: formattedDateTime, // Full date-time
    dateOnly: formattedDate, // Date only
    timeOnly: formattedTime, // Time only
  };
};

// Converts a File object into a temporary URL for preview.

export const convertFileToUrl = (file) => URL.createObjectURL(file);

//Formats a price string into a readable currency format.

export const formatPrice = (price) => {
  const amount = parseFloat(price); // Convert string to number
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

/**
 * Updates the current URL by adding or updating a query parameter.

 */
export function formUrlQuery({ params, key, value }) {
  const currentUrl = qs.parse(params); // Parse current query parameters
  currentUrl[key] = value; // Update/add the new key-value pair

  return qs.stringifyUrl(
    {
      url: window.location.pathname, // Keep the current path
      query: currentUrl,
    },
    { skipNull: true } // Remove null values from the query
  );
}

/**
 * Removes specified keys from the query parameters in the URL.
 
 */
export function removeKeysFromQuery({ params, keysToRemove }) {
  const currentUrl = qs.parse(params); // Parse current query parameters

  keysToRemove.forEach((key) => {
    delete currentUrl[key]; // Remove the specified keys
  });

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
}

/**
  Handles errors by logging them and throwing a new formatted error.

 */
export const handleError = (error) => {
  console.error(error);
  throw new Error(typeof error === "string" ? error : JSON.stringify(error));
};
