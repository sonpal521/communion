"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const links = [
  { id: 1, title: "Home", url: "/" },
  { id: 2, title: "Events", url: "/events" },
  { id: 3, title: "About", url: "/about" },
  { id: 4, title: "Create Event", url: "/create-event" },
];

function Menu() {
  const [open, setOpen] = useState(false);

  const { data: session } = useSession(); // Get the user session
  return (
    <div>
      <Image
        src={open ? "/assets/icons/close.svg" : "/assets/icons/open.svg"}
        alt="Menu"
        width={20}
        height={20}
        onClick={() => setOpen(!open)}
        className="cursor-pointer"
      />

      {open && (
        <div className="bg-white text-black absolute left-0 top-24 w-full h-[calc(100vh-6rem)] flex flex-col gap-8 items-center justify-center text-xl z-60">
          {links.map((item) => (
            <Link href={item.url} key={item.id} onClick={() => setOpen(false)}>
              {item.title}
            </Link>
          ))}

          {session ? (
            <div className="flex flex-col items-center gap-4">
              <span className="font-semibold text-lg">Hello, {session.user?.name}</span>
              <button
                onClick={() => {
                  console.log("Logout logic here");
                  setOpen(false);
                }}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link href="/login" onClick={() => setOpen(false)}>
              Login
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

export default Menu;
