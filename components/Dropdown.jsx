import { useState, useEffect, startTransition } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Input } from "@/components/ui/input";
import {
  createCategory,
  getAllCategories,
} from "@/lib/actions/category.actions";

function Dropdown({ value, onChangeHandler }) {
  const [categories, setCategories] = useState([]); // Holds the list of categories
  const [newCategory, setNewCategory] = useState(""); // Holds the new category input value

  // Handles adding a new category
  const handleAddCategory = async () => {
    if (!newCategory.trim()) return; // Prevent empty category creation

    try {
      const category = await createCategory({
        categoryName: newCategory.trim(),
      });

      // Update the state with the new category
      setCategories((prevState) => [...prevState, category]);
      setNewCategory(""); // Clear input field after adding
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  // Fetches all categories on component mount
  useEffect(() => {
    const getCategories = async () => {
      try {
        const categoryList = await getAllCategories();
        if (categoryList) setCategories(categoryList);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    getCategories();
  }, []);

  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="select-field w-[350px] border-1 bg-gray-100 border-gray-300 ">
        <SelectValue placeholder="Category" />
      </SelectTrigger>

      <SelectContent>
        {/* Display existing categories */}
        {categories.length > 0 &&
          categories.map((category) => (
            <SelectItem
              key={category._id}
              value={category._id}
              className="select-item p-regular-14"
            >
              {category.name}
            </SelectItem>
          ))}

        {/* "Add new category" button inside the dropdown */}
        <AlertDialog>
          <AlertDialogTrigger className="p-medium-14 flex w-full rounded-sm py-3 pl-8 text-primary-500 hover:bg-primary-50 focus:text-primary-500">
            Add new category
          </AlertDialogTrigger>

          <AlertDialogContent className="bg-white">
            <AlertDialogHeader>
              <AlertDialogTitle>New Category</AlertDialogTitle>
              <AlertDialogDescription>
                <Input
                  type="text"
                  placeholder="Category name"
                  className="input-field mt-3"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                />
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => startTransition(handleAddCategory)}
              >
                Add
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SelectContent>
    </Select>
  );
}

export default Dropdown;
