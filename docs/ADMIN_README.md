# Portfolio Admin Panel

This is a Headless CMS Admin Panel built with Next.js App Router, Supabase, and Tailwind CSS.

## Setup

1. **Environment Variables**: Ensure `.env.local` contains your Supabase credentials.
2. **Database Schema**: Run the SQL commands in `supabase/schema.sql` in your Supabase SQL Editor to create the `posts` table and `images` bucket with appropriate RLS policies.
3. **Install Dependencies**: `npm install` (already done).

## Features

- **Authentication**: Secure login with Supabase Auth.
- **Dashboard**: Overview of post stats.
- **Posts Management**: Create, Edit, Delete posts with Rich Text Editor (TipTap).
- **Media Library**: Upload and view images via Supabase Storage.
- **API**: `api/admin/posts` endpoint for fetching posts.
- **Security**: Middleware protection for `/admin` routes and RLS for database access.

## Future Improvements

- **Role Management**: Implement stricter role-based access control (RBAC) using a custom `profiles` table or Supabase Custom Claims.
- **Image Optimization**: Use Next.js Image Optimization with a custom loader for Supabase or transform images on upload.
- **Drag & Drop**: Enhance the media uploader with drag & drop support.
- **Preview Mode**: Implement Next.js Draft Mode for live preview of content before publishing.
- **Pagination**: Implement server-side pagination for posts and media if the datasets grow large.
- **Analytics Integration**: Add Vercel Analytics or Google Analytics charts to the dashboard.

## File Structure

- `/app/admin`: Admin routes (Login, Dashboard, Posts, Media).
- `/components/admin`: Reusable admin components (Sidebar, Forms, Shell).
- `/lib/supabase`: Supabase clients and middleware helper.
- `/validations`: Zod schemas.
- `/supabase/schema.sql`: Database definitions.
