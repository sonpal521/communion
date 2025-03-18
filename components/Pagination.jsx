"use client"; 

import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

import { formUrlQuery } from '@/lib/utils';
import { Button } from './ui/button';

// Pagination Component
function Pagination ({ page, totalPages, urlParamName })  {
  const router = useRouter(); // Next.js router for navigation
  const searchParams = useSearchParams(); // Get current search parameters

  // Function to handle button clicks (Next/Previous)
  const onClick = (btnType) => {
    const pageValue = btnType === 'next' 
      ? Number(page) + 1 // Increase page number for "Next"
      : Number(page) - 1; // Decrease page number for "Previous"

    // Generate a new URL with the updated page parameter
    const newUrl = formUrlQuery({
      params: searchParams.toString(), // Convert search params to string
      key: urlParamName || 'page', // Default key is 'page'
      value: pageValue.toString(), // Convert number to string for URL
    });

    // Navigate to the new URL without scrolling to the top
    router.push(newUrl, { scroll: false });
  };

  return (
    <div className="flex gap-2 mb-20">
      {/* Previous Button */}
      <Button
        size="lg"
        variant="outline"
        className="w-28"
        onClick={() => onClick('prev')}
        disabled={Number(page) <= 1} // Disable if already on the first page
      >
        Previous
      </Button>

      {/* Next Button */}
      <Button
        size="lg"
        variant="outline"
        className="w-28"
        onClick={() => onClick('next')}
        disabled={Number(page) >= totalPages} // Disable if already on the last page
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
