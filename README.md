# Reflecta Journal App

Welcome to the Reflecta Journal App! This is a simple journaling application that provides users with daily writing prompts as well as a mood tracker to help them track their mood over time. It allows to create, edit, and delete journal entries.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Notes](#notes)

## Features

### 1. Journal Entries
- Users can create a journal entry for each day.
- Entries are limited to one per day to encourage regular journaling.
- Users can edit and delete their journal entries.

### 2. Daily Writing Prompts
- Each day, users are presented with a random writing prompt in the form of a question to inspire their journal entry.

### 3. Mood Tracker
- Integrated into the journal entry form, users can select their mood from five predefined options when submitting their entry.
- The app generates a graphical representation of mood changes over time, allowing users to track their emotional well-being.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm (Node Package Manager) installed on your computer.

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/charischaefer/journal-app.git

2. **Navigate to the project directory**:

   ```bash
   cd journal-app

3. **Install dependencies for the server**:

   ```bash
   npm install

4. **Install dependencies for the client**:

   ```bash
   cd client
   npm install

5. **Create a `.env` file in the project directory and configure your database connection settings. Update the `.env` file with your database credentials. Replace `YOUR_PASSWORD` with your actual password**:

   ```
   DB_NAME=journal
   DB_PASS=YOUR_PASSWORD
   ```

6. **Create the MySQL database**:

- Open your MySQL client.
- Run the following command to create the database:

  ```sql
  CREATE DATABASE journal;

7. **Migrate the database from the project directory**:

   ```bash
   npm run migrate

## Usage

Now, you can start the development server and use the application.

- Run `npm start` in the project directory to start the Express server on port 4000.
- `cd client` and run `npm run dev` to start the client on port 5173.
- You can test your client app in `http://localhost:5173`.
- You can test your API in `http://localhost:4000/api`.

If you have any questions or encounter any issues during the installation process, please feel free to reach out for assistance. Happy journaling!

## Notes

_This is a student project that was created at [CodeOp](http://CodeOp.tech), a full stack development bootcamp in Barcelona._