# Blog API

Blog API is a fullstack blog application built from scratch. It consists of an Express back end serving as the CMS/API, a prerendered static blog frontend ([Stacked Stories](https://blog.gofhilman.my.id/)), and an admin dashboard for content management, deployment, analytics access, and moderation ([Stacked Control](https://control.gofhilman.my.id/)). The application focuses on core publishing features while maintaining a polished and minimalist design.

## Features

- CRUD operations for posts, comments, and categories.
- PostgreSQL database managed with Prisma ORM.
- User authentication with JSON Web Token (JWT) and Passport.js.
- Role-based access control for admins and registered users.
- Frontends built with React Router Framework Mode and Vite.
- Static site generation in the user frontend for the home page, RSS feed, and published post routes.
- Admin "Deploy posts" action that triggers the Cloudflare Pages deploy hook and records the latest deployment.
- RSS feed available at `/rss.xml`, with feed discovery metadata and a footer link.
- Integration with Cloudinary for image storage.
- Syntax highlighting for code snippets using Prism.js.
- Customizable TinyMCE editor with a custom skin and MathType/WIRIS formula support.
- Admin link to [Cloudflare web traffic analytics](https://dash.cloudflare.com/b27e283bc159bc215346d83f006c13b7/gofhilman.my.id).
- Unread comment notification popover for admins, backed by comment read tracking.
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
- **MathType/WIRIS** for formula editing in the writing editor.
- **Prism.js** for syntax highlighting.
- **Cloudinary** for image storage.

## Database Schema Visualization

![Database schema visualization](<public/database-schema.png>)

## Implementation Highlights

### Handling Database Connection Failures

- Added a Prisma client extension to retry connections using `p-retry`.
- Ensures the app works seamlessly even when the database is in a sleeping state.

### SSG and Deployment Workflow

- The user frontend prerenders the home page, `/rss.xml`, and every published post route.
- The admin dashboard includes a "Deploy posts" button that triggers a Cloudflare Pages deploy hook.
- Deployments are stored in the database so the dashboard can show the latest deployment time.

### RSS and SEO

- The blog exposes an RSS feed at `/rss.xml`.
- The feed is linked in the document head for feed discovery and in the site footer for readers.
- Meta tags and readable URI-based routes support indexable blog pages.

### Frontend Components

- **Combobox**: Allows creating new labels dynamically.
- **Dialogs**: Used for editing and delete confirmations.
- **Toaster**: Provides visual feedback for user actions.
- **Editor**: Custom TinyMCE skin, MathType/WIRIS formula tools, and integration with Cloudinary for image uploads.
- **Syntax Highlighter**: Prism.js integration with a custom theme.

### Admin Dashboard

- Provides a direct link to Cloudflare web traffic analytics.
- Shows unread comment notifications with a count badge and comment preview popover.
- Lets admins jump from unread comments to the related post editor for moderation.

### Authentication

- Token-based authentication with JWT.
- Role-based access control for admins and users.
- Password encryption for secure storage.

## How to Run the Project

1. Clone the repository and navigate to the project directory.

2. Install dependencies for the `backend`, `admin-frontend`, and `user-frontend` directories.

3. Set up environment variables:
   - Create `.env` files in the `backend`, `admin-frontend`, and `user-frontend` directories.
   - Add the required environment variables (look at `.env.example` files for the examples).

4. Run the back end, admin frontend, and user frontend.

5. Open the apps in your browser.
