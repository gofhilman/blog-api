# Blog API

Blog API is a fullstack blog application built from scratch. It consists of a back end serving as the Content Management System (CMS) and two frontend Single Page Applications (SPAs): the blog itself ([Stacked Stories](https://stacked-stories.pages.dev/)) and an admin dashboard for managing the blog ([Stacked Control](https://stacked-control.pages.dev/)). The application focuses on core features while maintaining a polished and minimalist design.

## Features

- CRUD operations for posts, comments, and categories.
- PostgreSQL database managed with Prisma ORM.
- User authentication with JSON Web Token (JWT) and Passport.js.
- Role-based access control for admins and registered users.
- Frontends built with React Router Framework Mode and Vite.
- Integration with Cloudinary for image storage.
- Syntax highlighting for code snippets using Prism.js.
- Customizable TinyMCE editor with a custom skin.
- Tailwind CSS for styling.
- Pre-made components from shadcn/ui.

## Tech Stack

### Back End

- **Node.js** with **Express** framework.
- **PostgreSQL** database.
- **Prisma ORM** for database migrations and queries.
- **JWT** and **Passport.js** for authentication.

### Front End

- **React** with **React Router Framework Mode**.
- **Vite** for bundling.
- **Tailwind CSS** for styling.
- **shadcn/ui** for pre-made components.
- **TinyMCE** for the writing editor.
- **Prism.js** for syntax highlighting.
- **Cloudinary** for image storage.

## Database Schema Visualization

![Database schema visualization](<public/Screenshot 2026-02-09 025201.png>)

## Implementation Highlights

### Handling Database Connection Failures

- Added a Prisma client extension to retry connections using `p-retry`.
- Ensures the app works seamlessly even when the database is in a sleeping state.

### Frontend Components

- **Combobox**: Allows creating new labels dynamically.
- **Dialogs**: Used for editing and delete confirmations.
- **Toaster**: Provides visual feedback for user actions.
- **Editor**: Custom TinyMCE skin and integration with Cloudinary for image uploads.
- **Syntax Highlighter**: Prism.js integration with a custom theme.

### Authentication

- Token-based authentication with JWT.
- Role-based access control for admins and users.
- Password encryption for secure storage.

### SEO Considerations

- Meta tags in React components.
- URI-based routing for readable and indexable links.

## How to Run the Project

1. Clone the repository and navigate to the project directory.

2. Install dependencies for the `backend`, `admin-frontend`, and `user-frontend` directories.

3. Set up environment variables:
   - Create `.env` files in the `backend`, `admin-frontend`, and `user-frontend` directories.
   - Add the required environment variables (look at `.env.example` files for the examples).

4. Run the back end, admin frontend, and user frontend.

5. Open the apps in your browser.
