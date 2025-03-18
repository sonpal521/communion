import Navbar from "@/components/Navbar"; 
import Footer from "@/components/Footer"; 
import AuthProvider from "@/components/AuthProvider"; 

import { Toaster } from "react-hot-toast";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <title>Communion Hub</title>
        <meta name="description" content="Find and join exciting events happening near you!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${inter.variable} bg-white min-h-screen`}>
        <Toaster position="top-right" />
        <AuthProvider>
         
            <Navbar />
            <main>{children}</main>
            <Footer />
          
        </AuthProvider>
      </body>
    </html>
  );
}
