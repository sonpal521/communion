"use client";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

function HeroSection() {
  return (
    <div className="relative px-4 sm:px-6 md:mx-32 lg:px-4 xl:px-4 py-20 dark:bg-dark flex flex-col items-center text-center lg:text-left lg:flex-row">
      <div className="max-w-2xl lg:w-1/2 xl:px-4">
        <h1 className="mb-5 text-5xl font-bold leading-tight text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text sm:text-3xl lg:text-5xl">
          Host, Connect, Celebrate: Your Events, Our Platform!
        </h1>
        <p className="mb-8 text-lg text-gray-600 dark:text-gray-400">
          Book and learn helpful tips from 3,168+ mentors in world-class companies with our global community.
          Stay updated with the latest discussions, events, and resources to fuel your passion and growth.
        </p>
        <div className="flex justify-center lg:justify-start">
          <Link href="/events">
            <Button className="px-6 py-3 text-lg cursor-pointer font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
              Get Explore
            </Button>
          </Link>
        </div>
        <div className="mt-12">
          <h6 className="mb-6 text-xs font-normal text-gray-600 dark:text-gray-400 flex items-center">
            Some Companies
            <span className="ml-3 h-px w-8 bg-gray-600"></span>
          </h6>
          <div className="flex items-center justify-center lg:justify-start space-x-4">
            <SingleImage imgSrc="https://cdn.tailgrids.com/2.0/image/assets/images/brands/ayroui.svg" />
            <SingleImage imgSrc="https://cdn.tailgrids.com/2.0/image/assets/images/brands/graygrids.svg" />
            <SingleImage imgSrc="https://cdn.tailgrids.com/2.0/image/assets/images/brands/uideck.svg" />
          </div>
        </div>
      </div>
      <div className=" mt-10 lg:mt-0 lg:w-1/2 flex justify-center">
        <Image
          src="/assets/images/banner.png"
          alt="hero"
          className="max-w-full h-auto md:ml-40"
          height={500}
          width={500}
        />
      </div>
    </div>
  );
}

const SingleImage = ({ imgSrc }) => {
  return (
    <div className="flex w-full items-center justify-center">
      <Image src={imgSrc} height={100} width={100} alt="brand image" className="h-10 w-auto" />
    </div>
  );
};

export default HeroSection;