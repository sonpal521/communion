"use client"
 
import React from "react";
import Image from "next/image";

const AboutSection = () => {
  return (
    <div className="w-full mt-15 mb-24 md:px-4 flex items-center justify-center py-5">
     
        <div className="lg:w-[90%] w-full flex flex-col lg:gap-6 lg:flex-row items-center justify-center">
          <div className="relative">
            {/* Side Images */}
            <Image
              className="absolute z-20 lg:left-8 -top-4 left-4 lg:w-32 lg:h-32 sm:w-24 sm:h-24 w-12 h-12 rounded-full"
              src="/assets/images/test2.jpg"
              alt="Side Image"
              width={128}
              height={128}
            />
            <Image
              className="absolute z-20 lg:top-48 sm:top-44 top-20 sm:-left-12 -left-8 lg:w-32 lg:h-32 sm:w-24 sm:h-24 w-12 h-12 rounded-full"
              src="/assets/images/test1.jpg"
              alt="Side Image 2"
              width={128}
              height={128}
            />
            <Image
              className="absolute z-20 lg:top-96 sm:top-80 top-40 left-4 lg:w-32 lg:h-32 sm:w-24 sm:h-24 w-12 h-12 rounded-full"
              src="/assets/images/test3.jpg"
              alt="Side Image 3"
              width={128}
              height={128}
            />
            {/* Main Image */}
            <Image
              className="rounded-full relative object-cover right-0 lg:w-96 lg:h-96 sm:w-80 sm:h-80 w-48 h-48 outline sm:outline-offset-3 outline-offset-2 outline-green-500"
              src="/assets/images/test4.jpg"
              alt="About us"
              width={384}
              height={384}
            />
          </div>
          {/* Content Section */}
          <div className="lg:w-[60%] lg:mt-0 md:mt-25  p-4 w-full shadow-xl shadow-green-300/40 flex flex-col justify-center items-center rounded-xl">
            <h2 className="text-4xl  text-center text-blue-600 dark:text-blue-400 font-bold px-4 py-1 md:mt-0 mt-10">
              About Us
            </h2>
            <h4 className="md:text-3xl text-2xl text-center text-gray-800 dark:text-gray-200 font-bold my-5">
              We are Petal Haven S.C.
            </h4>
            <h4 className="md:text-xl sm:text-lg text-base mt-2 text-justify sm:px-2 dark:text-gray-300">
              At Petal Haven, we believe in the transformative power of flowers. Our blooms are not just arrangements;
              they are expressions of beauty, joy, and emotion. From elegant bouquets to enchanting floral designs, we
              curate every creation with precision and care. Whether it's a celebration, a gesture of love, or a moment
              of solace, Petal Haven's exquisite flowers speak a language of their own, bringing nature's beauty to your
              doorstep.
            </h4>
            {/* Button */}
            <button className="lg:mt-10 mt-6 lg:px-6 px-4 lg:py-4 py-2 bg-blue-600  cursor-pointer rounded-sm lg:text-xl text-lg text-white font-semibold">
              Read More
            </button>
          </div>
        </div>
      </div>
    // </div>
  );
};

export default AboutSection;