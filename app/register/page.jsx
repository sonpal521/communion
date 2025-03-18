"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signupSchema } from "@/lib/validator"; // Import validation schema
import toast from "react-hot-toast";
import Link from "next/link";

const SignupPage = () => {
  const router = useRouter();
  const [error, setError] = useState(null);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data) => {
    setError(null);
  
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
  
      const result = await res.json();
  
      if (!res.ok) {
        toast.error(result.message || "Registration failed. Please try again."); // Show error toast
        setError(result.message);
        return;
      }
  
      toast.success("Registration successful! Redirecting to login..."); // Show success toast
      router.push("/login");
    } catch (err) {
      toast.error("Something went wrong. Please try again."); // Show generic error toast
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="w-full max-w-md bg-white shadow-2xl m-4 md-m-0 rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Create an Account
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Full Name"
              {...register("name")}
              className="w-full p-3 border bg-blue-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <input
              type="email"
              placeholder="Email Address"
              {...register("email")}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              {...register("password")}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600 transition-all"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
