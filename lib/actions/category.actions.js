"use server";

import { handleError } from "../utils";
import { connectToDatabase } from "../database";
import Category from "../database/models/category.model";



  
export const createCategory = async ({ categoryName }) => {
  try {
    // Establish database connection
    await connectToDatabase();

    // Create a new category with the provided name
    const newCategory = await Category.create({ name: categoryName });

    // Return the newly created category as a plain JavaScript object
    return JSON.parse(JSON.stringify(newCategory));
  } catch (error) {
    
    handleError(error);
  }
};


// Retrieves all categories from the database.

export const getAllCategories = async () => {
  try {
    // Establish database connection
    await connectToDatabase();

    // Fetch all categories from the database
    const categories = await Category.find();

    // Return the categories as plain JavaScript objects
    return JSON.parse(JSON.stringify(categories));
  } catch (error) {
    
    handleError(error);
  }
};
