
import { registerUser } from "@/lib/actions/user.actions";

// Define an asynchronous function to handle POST requests
export async function POST(req) {
  try {
    // Parse the JSON data from the request body
    const { name, email, password } = await req.json();

    // Call the registerUser function to create a new user
    const newUser = await registerUser({ name, email, password });

    // Return the newly created user as a JSON response with a 201 (Created) status
    return new Response(JSON.stringify(newUser), { status: 201 });

  } catch (error) {
    // If an error occurs, return an error message with a 400 (Bad Request) status
    return new Response(JSON.stringify({ message: error.message }), { status: 400 });
  }
}
