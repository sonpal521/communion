"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation"; // Import usePathname
import Menu from "./Menu";
import Image from "next/image";

function Navbar() {
  const { data: session } = useSession(); // Get the user session
  const [isOpen, setIsOpen] = useState(false); // Dropdown state
  const pathname = usePathname(); // Get current route

  return (
    <div className="h-18 w-full sticky top-0 z-50 flex items-center justify-between bg-white md:h-16 lg:px-20 xl:px-35 shadow-md">
      <div className=" w-full flex items-center justify-between">
        {/* LOGO */}
        <div className="flex justify-center items-center">
          <Image src="/assets/images/commlogo.png" alt="logo" className="mt-2" height={80} width={80} />
          <p className="text-xl font-bold text-blue-700">
            <Link href="/">Communion</Link>
          </p>
        </div>

        {/* LEFT LINKS */}
        <div className="hidden md:flex gap-6 font-bold text-black items-center">
          <Link href="/" className={`hover:text-blue-800 ${pathname === "/" ? "text-blue-700" : ""}`}>Home</Link>
          <Link href="/events" className={`hover:text-blue-800 ${pathname === "/events" ? "text-blue-700" : ""}`}>Events</Link>

          {/* Show "Create Event" only if user is logged in */}
          {session && (
            <Link href="/create-event" className={`hover:text-blue-800 ${pathname === "/create-event" ? "text-blue-700" : ""}`}>
              Create Event
            </Link>
          )}

          <Link href="/about" className={`hover:text-blue-800 ${pathname === "/about" ? "text-blue-700" : ""}`}>About</Link>
        </div>

        {/* MOBILE MENU */}
        <div className="md:hidden">
          <Menu />
        </div>

        {/* RIGHT LINKS */}
        <div className="hidden md:flex gap-4 items-center relative">
          {session ? (
            // Dropdown menu for logged-in user
            <div className="relative">
              {/* Profile Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-gray-200 text-black font-bold py-2 px-4 cursor-pointer rounded-full flex items-center gap-2"
              >
                <span>{session.user?.name}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-md cursor-pointer rounded-lg p-2">
                  <p className="px-4 py-2 text-gray-700 font-semibold">{session.user?.email}</p>
                  <hr />
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="block w-full text-left px-4 py-2 cursor-pointer text-red-600 hover:bg-gray-100 rounded-md"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            // Sign In Button if user is not logged in
            <Link href="/login">
              <button className="bg-black hover:bg-blue-600 text-white cursor-pointer font-bold py-2 px-4 rounded-full">
                Sign In
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
