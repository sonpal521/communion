"use client";

import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";



const LoginPage = () => {
  const router = useRouter();
  const [error, setError] = useState(null);
  const { register, handleSubmit } = useForm();


  const onSubmit = async (data) => {
    setError(null); // Reset previous errors
  
    const res = await signIn("credentials", {
      ...data,
      redirect: false,
    });
  
    if (!res.ok) {
      toast.error("Invalid email or password!"); 
      setError("Invalid email or password");
      return;
    }
  
    toast.success("Login successful! Redirecting... Home Page"); // Show success toast
    router.push("/"); // Redirect to homepage
  };
  
  return (
    <div className="flex justify-center m-4 md:m-0 items-center min-h-screen  px-4 sm:px-6">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-lg p-6 sm:p-8 ">
        {/* Title */}
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Sign In
        </h2>

        {/* Display error message if login fails */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* Login Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email Input */}
          <div>
            <input
              type="email"
              placeholder="Email Address"
              {...register("email", { required: true })}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              aria-label="Email Address"
            />
          </div>

          {/* Password Input */}
          <div>
            <input
              type="password"
              placeholder="Password"
              {...register("password", { required: true })}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              aria-label="Password"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 cursor-pointer rounded-lg font-semibold hover:bg-blue-600 transition-all"
          >
            Login
          </button>
        </form>

        {/* Signup Link */}
        <p className="text-center text-gray-600 mt-4">
          Don't have an account?{" "}
          <Link href="/register" className="text-blue-500 hover:underline cursor-pointer">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
