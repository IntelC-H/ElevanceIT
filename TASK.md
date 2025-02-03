# Technical Task (FE + BE) for Developing a Simple Job Board

## **Objective**
Create a simple job board using **Next.js**, **React.js**, **Node.js**, and **TypeScript/JavaScript**. The job board should allow users to view job postings, search for jobs, and allow admins to manage job listings (add, edit, and delete jobs).

---

## **Requirements**

### **1. Features**

#### **Frontend (User Interface)**
- **Job Listings Page:**
  - Display a list of job postings with the following details:
    - Job title
    - Company name
    - Location
    - Job type (e.g., Full-Time, Part-Time, Remote)
    - Posted date
  - Pagination for job listings.
  
- **Job Details Page:**
  - Display the full details of a job when clicked from the listing page, including:
    - Job description
    - Responsibilities
    - Requirements
    - Application link or button.
  
- **Search and Filter:**
  - Implement a search bar to filter jobs by keywords (e.g., title, company).
  - Add filters for:
    - Location
    - Job type (Full-Time, Part-Time, Remote)

- **Admin Panel:**
  - Add, edit, and delete job postings.
  - Optional: Admin authentication via login (use **Clerk** or **NextAuth**).

#### **Backend**
- **Job Management API:**
  - CRUD (Create, Read, Update, Delete) operations for job postings.
  - API endpoints:
    - `GET /api/jobs` - Get all job listings (with pagination).
    - `GET /api/jobs/:id` - Get details for a single job.
    - `POST /api/jobs` - Create a new job (Admin only).
    - `PUT /api/jobs/:id` - Update an existing job (Admin only).
    - `DELETE /api/jobs/:id` - Delete a job (Admin only).
  
- **Authentication API (Optional):**
  - Implement authentication only if admin functionality is included.
    - Use **Clerk** or **NextAuth** for handling user sessions.

#### **Database**
- Use any database solution (SQL or NoSQL) to store job postings and admin user data.
  - Suggested SQL: PostgreSQL or MySQL.
  - Suggested NoSQL: MongoDB or Firebase.

---

### **2. Technical Requirements**

#### **Frontend**
- Use **Next.js** for server-side rendering and static site generation.
- Use **React.js** for building reusable components.
- Use **TypeScript** for type safety.
- Use **Tailwind CSS** for styling.
- State management: Use **Zustand** for lightweight state management.
- Use **shadcn/ui** for pre-built and customizable components.

#### **Backend**
- Use **tRPC** with **Next.js** for building type-safe APIs (optional).
- Use **TypeScript** for the backend for consistent typing.
- Validate inputs and API requests using a library like **zod**.

#### **Infrastructure**
- Deploy the application to **Vercel** (for frontend and API).
- Use **GitHub Actions** for CI/CD (optional).

---

### **3. Design and User Experience**

- **Responsive Design:**
  - Ensure the application is fully responsive and works well on desktops, tablets, and mobile devices.
- **Minimalistic UI:**
  - Focus on a clean and user-friendly design using **Tailwind CSS** and **shadcn/ui**.

---

### **4. Development Milestones**

#### **Backend Development**
- Set up Next.js API routes with **tRPC**.
- Create CRUD operations for job listings.
- Connect the backend to the selected database.

#### **Frontend Development**
- Set up Next.js with TypeScript.
- Create reusable components for job cards, headers, footers, etc.
- Integrate frontend with the backend API using **tRPC**.

#### **Admin Panel & Authentication**
- Add login functionality for admin (using **Clerk** or **NextAuth**).
- Create an admin panel for managing job listings.

#### **Search, Filters, Testing & Deployment**
- Implement search and filters on the job listings page.
- Test the application (manual and automated testing).
- Deploy the application to production.

---

### **5. Deliverables**

- Fully functional job board with both frontend and backend.
- Source code on GitHub with clear instructions on setting up and running the project locally.

---

### **6. Timeline**

- The task should be completed within **1 week**.
- Make the solution as flexible and reusable as possible.
