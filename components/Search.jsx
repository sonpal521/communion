"use client";

import Image from "next/image";
import { useEffect, useState, useCallback, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "./ui/input";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";

const Search = ({ placeholder = "Search title..." }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentParams = useMemo(() => searchParams.toString(), [searchParams]);

  const [query, setQuery] = useState(() => {
    return searchParams.get("query") || "";
  });

  // Function to update the URL
  const updateSearchParams = useCallback(() => {
    const newUrl = query
      ? formUrlQuery({ params: currentParams, key: "query", value: query })
      : removeKeysFromQuery({ params: currentParams, keysToRemove: ["query"] });

    router.push(newUrl, { scroll: false });
  }, [query, currentParams, router]);

  // Debounce Effect
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      updateSearchParams();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query, updateSearchParams]);

  return (
    <div className="flex items-center  gap-3 w-full my-1 max-w-md bg-white border border-gray-300 rounded-lg px-4 py-2 shadow-sm  focus-within:ring-primary-500 transition-all md:max-w-lg lg:max-w-xl">
      <Input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 bg-transparent text-gray-700 placeholder-gray-400 "
      />
      <Image src="/assets/icons/search.svg" alt="search" width={20} height={20} className="text-gray-500" />
    </div>
  );
};

export default Search;
