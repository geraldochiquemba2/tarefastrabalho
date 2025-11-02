# Fluxograma - Sistema de Cadastro Bibliotecário

## Overview

This is an interactive flowchart visualization application for library management workflows. The application allows users to view animated, interactive flowcharts that represent different processes in a library system, such as book, author, and category registration workflows. Users can explore multiple task-based flowcharts, click on nodes for detailed information, and navigate through different workflow diagrams.

The application serves as an educational tool for software engineering, providing visual representations of library system workflows with a focus on clarity, interactivity, and user engagement.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React with TypeScript, using Vite as the build tool and development server.

**UI Component Library**: shadcn/ui (New York style variant) built on Radix UI primitives, providing accessible and customizable components. The design system emphasizes Material Design principles with inspiration from Whimsical and Lucidchart for flowchart visualization.

**Routing**: Client-side routing implemented with Wouter, a lightweight routing library that provides a minimal API for navigation.

**State Management**: TanStack Query (React Query) for server state management, handling data fetching, caching, and synchronization. Local component state managed with React hooks.

**Flowchart Rendering**: ReactFlow library for interactive node-based diagram visualization, providing pan, zoom, and node interaction capabilities.

**Styling**: Tailwind CSS with custom theme configuration, including CSS variables for color theming and support for light/dark modes. Custom spacing, border radius, and color schemes defined in the Tailwind configuration.

**Key Design Decisions**:
- Custom flowchart nodes with type-specific styling (start/end, process, gateway, book, author, category)
- Responsive layout with sidebar navigation and main canvas area
- Interactive node detail panel that slides in from the right when nodes are clicked
- Visual feedback through hover states, animations, and color-coded node types

### Backend Architecture

**Server Framework**: Express.js running on Node.js, serving both API endpoints and static frontend assets.

**Development Setup**: Vite middleware integration for hot module replacement during development, with separate production build process.

**API Design**: RESTful API endpoints for task management:
- `GET /api/tasks` - Retrieve all tasks
- `GET /api/tasks/:id` - Retrieve specific task by ID

**Data Storage**: Currently using in-memory storage (`MemStorage` class) for development. The application is structured to support PostgreSQL through Drizzle ORM, but the in-memory implementation is active.

**Server-Side Rendering**: Custom Vite SSR setup for development mode, with static file serving in production.

**Key Design Decisions**:
- Separation of concerns with modular route handlers and storage interfaces
- Request/response logging middleware for API monitoring
- Extensible storage interface (`IStorage`) allowing easy transition from in-memory to database persistence
- Environment-aware configuration (development vs. production modes)

### Database Schema (Drizzle ORM)

**ORM**: Drizzle ORM configured for PostgreSQL with Zod schema validation.

**Tables**:
- `users`: User authentication with UUID primary keys, unique usernames, and password fields
- `tasks`: Task/flowchart metadata including title, description, deadline, route, and difficulty level

**Schema Validation**: Drizzle-Zod integration for runtime type safety and validation of insert operations.

**Migration Strategy**: Schema-first approach with migrations stored in `/migrations` directory, using `drizzle-kit push` for schema synchronization.

**Key Design Decisions**:
- UUID-based user identification using PostgreSQL's `gen_random_uuid()`
- Separation of insert schemas from table schemas for data validation
- Type-safe database operations with full TypeScript inference

### External Dependencies

**Database**: 
- Neon Serverless PostgreSQL driver (`@neondatabase/serverless`) for database connectivity
- Connection configured via `DATABASE_URL` environment variable

**UI Component Libraries**:
- Radix UI component primitives for accessible, unstyled components
- ReactFlow for flowchart visualization and interaction
- Lucide React for iconography

**Form Handling**:
- React Hook Form with Hookform Resolvers for form state management
- Zod for schema-based validation

**Styling & Utilities**:
- Tailwind CSS for utility-first styling
- class-variance-authority (CVA) for component variant management
- clsx and tailwind-merge for conditional class name composition
- date-fns for date formatting and manipulation

**Development Tools**:
- Replit-specific plugins for development banner, error overlay, and cartographer integration
- TypeScript with strict mode enabled
- ESBuild for production bundling

**Key Integration Points**:
- Environment variable configuration for database connections
- Font integration from Google Fonts (Inter, Architects Daughter, DM Sans, Fira Code, Geist Mono)
- Path aliases configured for clean imports (`@/`, `@shared/`, `@assets/`)