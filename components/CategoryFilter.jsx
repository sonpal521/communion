"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllCategories } from "@/lib/actions/category.actions";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";

const CategoryFilter = () => {
  const [categories, setCategories] = useState([]);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchCategories = async () => {
      const categoryList = await getAllCategories();
      if (categoryList) {
        setCategories(categoryList);
      }
    };
    fetchCategories();
  }, []);

  const onSelectCategory = (category) => {
    let newUrl = "";

    if (category && category !== "All") {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "category",
        value: category,
      });
    } else {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["category"],
      });
    }

    router.push(newUrl, { scroll: false });
  };

  return (
    <div className="relative w-full max-w-[250px]">
      <Select onValueChange={onSelectCategory}>
        <SelectTrigger className="w-full px-4 py-4 min-h-[55px] my-1  text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm ">
          <SelectValue placeholder="Select Category" />
        </SelectTrigger>
        <SelectContent className="bg-white border border-gray-200 shadow-lg rounded-lg">
          <SelectItem
            value="All"
            className="p-4 text-gray-700 hover:bg-primary-100 hover:text-primary-600 transition duration-150 rounded-md"
          >
            All
          </SelectItem>
          {categories.map((category) => (
            <SelectItem
              key={category._id}
              value={category.name}
              className="p-3 text-gray-700 text-sm hover:bg-primary-100 hover:text-primary-600 transition duration-150 rounded-md"
            >
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CategoryFilter;
