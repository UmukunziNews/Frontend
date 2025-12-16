# Umukunzi News - Modern News Broadcasting Platform

## Overview

Umukunzi News is a multimedia news broadcasting website built with a modern full-stack architecture. The platform displays news articles across six categories (Entertainment, Business & Tech, Sports, Politics, Society & People, Investigations) with support for video, image, and audio content. The design follows contemporary news platforms like BBC News and The Verge, prioritizing content readability and card-based layouts.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight alternative to React Router)
- **State Management**: TanStack React Query for server state and data fetching
- **Styling**: Tailwind CSS with CSS variables for theming (light/dark mode support)
- **Component Library**: shadcn/ui components built on Radix UI primitives
- **Build Tool**: Vite with path aliases (@/, @shared/, @assets/)

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript with ES modules
- **API Design**: RESTful endpoints under /api/ prefix
- **Server Structure**: Modular with separate files for routes, storage, and static serving
- **Development**: Vite dev server integration with HMR for the frontend

### Data Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Location**: shared/schema.ts (shared between frontend and backend)
- **Validation**: Zod schemas generated from Drizzle schemas via drizzle-zod
- **Current Storage**: In-memory storage with dummy data (database tables defined but not yet connected)

### Key Design Patterns
- **Monorepo Structure**: Client code in /client, server in /server, shared types in /shared
- **Type Sharing**: Schema types exported from shared/schema.ts used by both frontend and backend
- **API Pattern**: Query keys match API paths for predictable data fetching
- **Component Architecture**: Feature components (NewsCard, NewsGrid, Sidebar) composed from UI primitives

### Content Model
- **Articles**: Support three media types (video, image, audio) with thumbnails
- **Categories**: Six fixed categories defined as a const array for type safety
- **Advertisements**: Placement-based (sidebar or inline) with dedicated components

## External Dependencies

### Database
- **PostgreSQL**: Primary database (requires DATABASE_URL environment variable)
- **Drizzle Kit**: Database migration and schema push tooling

### UI Components
- **Radix UI**: Full suite of accessible, unstyled primitives (dialog, dropdown, tabs, etc.)
- **Lucide React**: Icon library
- **Embla Carousel**: Carousel functionality
- **class-variance-authority**: Component variant management

### Development Tools
- **Vite Plugins**: @replit/vite-plugin-runtime-error-modal, cartographer, dev-banner for Replit integration
- **esbuild**: Production server bundling with selective dependency bundling

### Session/Auth (configured but not fully implemented)
- **connect-pg-simple**: PostgreSQL session store
- **express-session**: Session middleware
- **passport/passport-local**: Authentication framework

### Social Sharing & Analytics
- View counter on articles (increments on page visit)
- Social sharing buttons (Twitter/X, Facebook, LinkedIn, WhatsApp, Email, Copy Link)

### Search & Filtering
- Full-text search on article titles and descriptions
- Filter by category, media type, and date range
- Mobile-responsive filter sheet

### Seasonal Banners
- Dynamic banners for holidays (Christmas, Black Friday, Heroes Day)
- Supports image, video, and GIF media
- Dismissible with localStorage snooze (24 hours)