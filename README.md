# Communion Hub

## Overview
Communion Hub is a community-driven web application designed to connect people of all faiths through events and shared experiences. Users can explore upcoming events, filter them by category, and even create new events to foster connections and engagement.

## Features
- **Home Page:** Introduction to the platform with a hero section and a call-to-action.
- **Signup and Login Page:** I implemented auth funtionality If the user login then create Events.
- **About Page:** About the community.
- **Event Listing Page:** View events with title, date, location, and description.
- **Event Detail Page:** View events with title, date, location, and description and more information .
- **Event Filtering:** Filter events by categories such as Religious, Social, and Charity.
- **Event Creation:** Users can add new events by providing a title, date, and category.
- **Search Functionality:** Quickly find relevant events using search.
- **Pagination:** Browse through events efficiently with pagination support.
- **Authentication:** Secure user authentication powered by Next.js Auth.
- **File Uploads:** Upload event-related media using UploadThing.
- **Database Storage:** MongoDB for efficient event storage and retrieval.

## Tech Stack
- **Next.js** – Framework for server-side rendering and static site generation.
- **React.js** – Frontend library for UI components.
- **JavaScript** – Programming language for interactive features.
- **NextAuth.js** – Authentication management.
- **UploadThing** – File upload handling.
- **MongoDB** – NoSQL database for event storage.
- **ShadCN/UI** – Pre-built UI components for enhanced styling.
- **Tailwind CSS** – Utility-first CSS framework for styling.

## Installation & Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/communion-hub.git
   ```
2. Navigate to the project directory:
   ```sh
   cd communion-hub
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Set up environment variables in a `.env.local` file:
   ```env
   NEXTAUTH_URL=http://localhost:3000
   DATABASE_URL=your_mongodb_connection_string
   UPLOADTHING_SECRET=your_uploadthing_api_key
   ```
5. Run the development server:
   ```sh
   npm run dev
   ```
6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage
- Visit the home page to learn about Communion Hub.
- Navigate to the Events page to explore, search, and filter events.
- Use the "Add Event" form to contribute new events to the community.
- Authenticate to manage personal events and preferences.

## Contributing
Contributions are welcome! Feel free to fork the repository, create a feature branch, and submit a pull request.


