
# CRM Application - Frontend UI

This is the frontend user interface for the Full-Stack CRM Application built for the Intern Developer assessment. It provides a clean, responsive, and intuitive dashboard for sales teams to manage leads, track deal values, and maintain internal notes.

## 🚀 Tech Stack

* **Framework:** React (Bootstrapped with Vite for fast HMR and optimized builds)
* **Styling:** Tailwind CSS (v4)
* **Routing:** React Router DOM
* **HTTP Client:** Axios (Configured with request interceptors for JWT token handling)
* **State Management:** React Context API (AuthContext for global user state)

## ✨ Key Features

* **Protected Routes:** Secure navigation ensuring only authenticated users can access the CRM.
* **Interactive Dashboard:** High-level analytics showing total leads, deals won, and revenue estimates.
* **Lead Management:** * View all leads in a clean data table.
  * Add, Edit, and Delete leads via an intuitive modal form.
  * Real-time search by name, company, or email (implemented with debounce to optimize API calls).
* **Lead Details & Notes:** A dedicated view for each lead to see full details and append chronological internal notes.
* **Responsive Layout:** A modern sidebar navigation structure that scales well across devices.

## 📋 Prerequisites

Before running this project, ensure you have:
* [Node.js](https://nodejs.org/) installed.
* The **Backend API** running locally on port 3000 (See backend setup instructions).

## 🛠️ Setup Instructions

**1. Clone the repository and navigate to the frontend directory:**

**2. Install dependencies:**
```bash
npm install
```

**3. Configure Environment:**
By default, the application expects the backend API to run on `http://localhost:3000/api`. If your backend is hosted elsewhere, update the `baseURL` in `src/services/api.js`.

**4. Start the development server:**
```bash
npm run dev
```
The application will usually be available at `http://localhost:5173`.

## 🔐 Test Login Credentials
Please ensure you have run the database seeder script in the backend repository before logging in.
- **Email:** `admin@example.com`
- **Password:** `password123`

## 📂 Project Structure Highlights
- `src/components/` - Reusable UI elements (Layout, Navbar, Sidebar).
- `src/pages/` - Main route views (Login, Dashboard, Leads, LeadDetails).
- `src/context/` - Global state management (AuthContext).
- `src/services/` - Axios configuration and API interceptors.

## 💡 Reflection & Bonus Implementations
**Reflection:**
Building this CRM was a great exercise in full-stack integration. I focused heavily on creating a seamless user experience by keeping the UI clean and ensuring rapid interactions. Handling the JWT authentication flow and managing component state across different routes were the most challenging yet rewarding parts of the process.

**Bonus Features Added:**
- **Global Search with Debounce:** Added a search bar that filters leads dynamically without overloading the backend API
- **Tailwind v4 Integration:** Used the latest version of Tailwind CSS for highly optimized and rapid styling.
- **Aggregated Dashboard Stats:** Implemented MongoDB aggregation pipelines on the backend to feed real-time, accurate revenue data to the frontend cards.
- **Graceful Error Handling:** Implemented safe rendering techniques (e.g., date formatting fallbacks) to prevent UI crashes if backend data is malformed.
