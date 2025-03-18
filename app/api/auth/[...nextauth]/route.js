import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getUserByEmail } from "@/lib/actions/user.actions";
import bcrypt from "bcryptjs";

// Define authentication options
export const authOptions = {
  session: {
    strategy: "jwt", // Use JSON Web Tokens (JWT) for session management instead of database sessions
  },
  providers: [
    CredentialsProvider({
      name: "credentials", // Name of the authentication provider
      credentials: {
        email: { label: "Email", type: "email", required: true }, // Email input field
        password: { label: "Password", type: "password", required: true }, // Password input field
      },
      async authorize(credentials) {
        // Fetch user by email from the database
        const user = await getUserByEmail(credentials.email);
        if (!user) throw new Error("Invalid email or password"); // If user not found, throw an error

        // Compare entered password with the stored hashed password
        const isMatch = await bcrypt.compare(credentials.password, user.password);
        if (!isMatch) throw new Error("Invalid email or password"); // If passwords don't match, throw an error

        // If authentication is successful, return user details
        return { id: user._id, name: user.name, email: user.email };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // If a user is authenticated, add user ID and email to the token
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token; // Return the modified token
    },
    async session({ session, token }) {
      // Attach user ID from the token to the session object
      session.user.id = token.id;
      return session; // Return the updated session
    },
  },
  secret: process.env.NEXTAUTH_SECRET, // Secret key for NextAuth encryption
  pages: {
    signIn: "/login", // Custom login page route
  },
};

// Create API handler for authentication
const handler = NextAuth(authOptions);

// Export API routes for GET and POST requests
export { handler as GET, handler as POST };
