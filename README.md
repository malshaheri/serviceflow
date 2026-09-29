# ServiceFlow

ServiceFlow is a modern service management dashboard built with React, TypeScript, and Vite.

It simulates the daily workflow of a small service company, including customer management, service requests, scheduling, team management, and company settings.

## Features

- Dashboard with service request statistics
- Customer management
- Service request management
- Daily schedule view
- Team member management
- Company settings
- English and German interface
- Search and filtering
- Form validation with Zod
- Data fetching and mutations with TanStack Query
- Local persistence through a mock API layer using localStorage
- Responsive dashboard layout

## Tech Stack

- React
- TypeScript
- Vite
- React Router
- TanStack Query
- Zod
- CSS
- Oxlint

## Architecture

ServiceFlow separates UI components from data access through a lightweight API abstraction layer.

Main API modules:

- `serviceRequestsApi.ts`
- `customersApi.ts`
- `teamMembersApi.ts`
- `settingsApi.ts`

TanStack Query handles fetching, caching, mutations, and query invalidation. The current API layer uses `localStorage` to simulate backend persistence while keeping data-access logic outside the page components.

## Pages

- Dashboard
- Customers
- Service Requests
- Schedule
- Team
- Settings

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Run the linter:

```bash
npm run lint
```

## Project Status

ServiceFlow is complete as a portfolio project. The app currently uses a mock API layer backed by `localStorage`, making it easy to replace with a real backend later without restructuring the UI.

## Author

Mohammed Alshaheri
