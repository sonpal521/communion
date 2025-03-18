"use client"

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const navLinks = [
    { href: "#", label: "Home" },
    { href: "#", label: "Events" },
    { href: "#", label: "About" },
  ];

  const socialLinks = [
    { href: "#", src: "/assets/icons/facebook.svg", alt: "Facebook" },
    { href: "#", src: "/assets/icons/twitter.svg", alt: "Twitter" },
    { href: "#", src: "/assets/icons/linkedin.svg", alt: "LinkedIn" },
  ];

  const iconClasses =
    "p-3 rounded-full bg-gray-800 hover:scale-105 transition-all shadow-lg";

  return (
    <footer className="bg-black text-white py-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Logo & About */}
        <div className="flex flex-col items-center sm:items-start">
          <Image
            src="/assets/images/commlogo.png"
            alt="Brand Logo"
            width={100}
            height={100}
            className="object-contain drop-shadow-lg transform transition-all hover:scale-105"
          />
          <p className="text-gray-400 mt-3 text-center sm:text-left">
            Elevate your experience with our innovative solutions.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col items-center sm:items-start">
          <h2 className="text-xl font-semibold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Quick Links
          </h2>
          <ul className="mt-3 space-y-2 text-gray-300">
            {navLinks.map((link, index) => (
              <li key={index}>
                <Link href={link.href} className="hover:text-white transition-all">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Social Media */}
        <div className="flex flex-col items-center sm:items-start">
          <h2 className="text-xl font-semibold bg-gradient-to-r from-blue-400 to-teal-500 bg-clip-text text-transparent">
            Follow Us
          </h2>
          <div className="flex mt-3 space-x-4">
            {socialLinks.map((social, index) => (
              <Link key={index} href={social.href} className={iconClasses}>
                <Image src={social.src} alt={social.alt} width={25} height={25} />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-700 mt-10 pt-5 text-center text-gray-500">
        © {new Date().getFullYear()} Your Brand. All rights reserved.
      </div>
    </footer>
  );
}
