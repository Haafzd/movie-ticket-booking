# Movie Ticket Booking Application Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox syntax for tracking.

**Goal:** Build a high-performance, visually stunning "Cinematic Dark Lux" Movie Catalog & Ticket Booking React application (CineVerse) using React 19, TypeScript, Material-UI, Redux Toolkit, React Router DOM v7, and TVMaze API integration.
**Architecture:** Feature-driven modular frontend structure with Redux Toolkit state management, TVMaze API integration, LocalStorage persistence middleware, and custom MUI theme with signature Digital Ticket Stub UI components.
**Tech Stack:** React 19, TypeScript 6, Vite 8, `@mui/material` v9, `@mui/icons-material`, `@reduxjs/toolkit`, `react-redux`, `react-router-dom` v7.

---

## File Structure Plan

- **Types & Theme:**
  - `src/types/index.ts`: TypeScript interfaces for Show, Booking, State schemas.
  - `src/theme/theme.ts`: Custom MUI theme configuration (Colors, Typography, Glassmorphism, Micro-animations).
  - `src/index.css`: Global styles & Google Fonts imports (`Plus Jakarta Sans` & `Bebas Neue`).

- **Redux Store:**
  - `src/store/slices/filmSlice.ts`: AsyncThunks for TVMaze search & detail, catalog state management.
  - `src/store/slices/bookingSlice.ts`: Ticket booking state, cancel action, total count.
  - `src/store/localStorageMiddleware.ts`: Redux middleware for automatic localStorage persistence of bookings.
  - `src/store/index.ts`: Root store configuration & typed hooks exports (`useAppDispatch`, `useAppSelector`).

- **API Layer:**
  - `src/api/tvmazeApi.ts`: Public TVMaze API service routines.

- **Components:**
  - `src/components/Common/HeaderNav.tsx`: Glassmorphism header navbar with logo, nav links, & ticket counter badge.
  - `src/components/Common/Footer.tsx`: Cinema-themed footer.
  - `src/components/Common/LoadingSkeleton.tsx`: MUI Skeleton UI for movie grid & detail.
  - `src/components/Common/ErrorAlert.tsx`: Error banner with retry trigger.
  - `src/components/Catalog/SearchBar.tsx`: Search bar with debounced input.
  - `src/components/Catalog/GenreFilter.tsx`: Genre filter chip selectors.
  - `src/components/Catalog/MovieCard.tsx`: Poster card with zoom effect, rating star, and genre badges.
  - `src/components/Detail/MovieHero.tsx`: Backdrop hero section with HD poster, summary HTML safe-render, & info metrics.
  - `src/components/Detail/BookingForm.tsx`: Schedule picker, quantity counter (1-10), total price calculator, and booking submit.
  - `src/components/Tickets/TicketStubCard.tsx`: Signature perforated digital ticket stub UI with QR/barcode simulation & cancel button.
  - `src/components/Tickets/CancelConfirmModal.tsx`: MUI Dialog for confirming ticket cancellation.

- **Pages:**
  - `src/pages/CatalogPage.tsx`: Catalog grid page with search, filters, and movie cards.
  - `src/pages/MovieDetailPage.tsx`: Movie detail & ticket booking page.
  - `src/pages/MyTicketsPage.tsx`: Booked tickets list page using Ticket Stub cards.
  - `src/pages/NotFoundPage.tsx`: 404 page.

---

### Task 1: Core Types & Custom MUI Theme Setup
**Files:**
- Create: `src/types/index.ts`
- Create: `src/theme/theme.ts`
- Modify: `src/index.css`
- Modify: `index.html`

- [ ] Step 1: Define TypeScript interfaces in `src/types/index.ts`
- [ ] Step 2: Configure MUI Theme in `src/theme/theme.ts` with Midnight Obsidian color palette and typography
- [ ] Step 3: Add Google Fonts (`Plus Jakarta Sans` & `Bebas Neue`) in `index.html` and `src/index.css`
- [ ] Step 4: Run `npx oxlint` and `npm run build` to verify type safety
- [ ] Step 5: Git commit task changes

### Task 2: Data & API Layer (TVMaze Service & Redux filmSlice)
**Files:**
- Create: `src/api/tvmazeApi.ts`
- Create: `src/store/slices/filmSlice.ts`

- [ ] Step 1: Implement TVMaze API fetchers in `src/api/tvmazeApi.ts`
- [ ] Step 2: Implement Redux `filmSlice` with `fetchShows` and `fetchShowDetail` asyncThunks
- [ ] Step 3: Verify build with `npm run build`
- [ ] Step 4: Git commit task changes

### Task 3: Booking & LocalStorage Persistence Layer
**Files:**
- Create: `src/store/slices/bookingSlice.ts`
- Create: `src/store/localStorageMiddleware.ts`
- Create: `src/store/index.ts`

- [ ] Step 1: Implement `bookingSlice.ts` for adding & cancelling ticket bookings
- [ ] Step 2: Implement `localStorageMiddleware.ts` for saving/loading bookings from `localStorage`
- [ ] Step 3: Configure root Redux store in `src/store/index.ts`
- [ ] Step 4: Verify build with `npm run build`
- [ ] Step 5: Git commit task changes

### Task 4: Layout & Common UI Components
**Files:**
- Create: `src/components/Common/HeaderNav.tsx`
- Create: `src/components/Common/Footer.tsx`
- Create: `src/components/Common/LoadingSkeleton.tsx`
- Create: `src/components/Common/ErrorAlert.tsx`
- Modify: `src/App.tsx`

- [ ] Step 1: Build `HeaderNav.tsx` with glassmorphism, logo glow, and Redux active ticket badge
- [ ] Step 2: Build `Footer.tsx` with cinema branding
- [ ] Step 3: Build `LoadingSkeleton.tsx` and `ErrorAlert.tsx`
- [ ] Step 4: Set up `App.tsx` with `ThemeProvider`, `Provider` (Redux), and `BrowserRouter`
- [ ] Step 5: Verify build with `npm run build`
- [ ] Step 6: Git commit task changes

### Task 5: Catalog Feature (Search, Genre Filters & Movie Grid Cards)
**Files:**
- Create: `src/components/Catalog/SearchBar.tsx`
- Create: `src/components/Catalog/GenreFilter.tsx`
- Create: `src/components/Catalog/MovieCard.tsx`
- Create: `src/pages/CatalogPage.tsx`

- [ ] Step 1: Build `SearchBar.tsx` with debounced search input dispatching `fetchShows`
- [ ] Step 2: Build `GenreFilter.tsx` for filtering movies by genre chip
- [ ] Step 3: Build `MovieCard.tsx` with poster image zoom on hover, star rating, and genre chips
- [ ] Step 4: Build `CatalogPage.tsx` integrating Search, Filters, Skeletons, Error state, and Grid
- [ ] Step 5: Verify build with `npm run build`
- [ ] Step 6: Git commit task changes

### Task 6: Movie Detail & Ticket Booking Form Feature
**Files:**
- Create: `src/components/Detail/MovieHero.tsx`
- Create: `src/components/Detail/BookingForm.tsx`
- Create: `src/pages/MovieDetailPage.tsx`

- [ ] Step 1: Build `MovieHero.tsx` displaying backdrop blur, HD poster, summary text, and metrics
- [ ] Step 2: Build `BookingForm.tsx` with schedule selector, quantity selector (1-10), total price calculation (Rp 50.000 / ticket), and booking dispatch
- [ ] Step 3: Build `MovieDetailPage.tsx` handling route params and API state
- [ ] Step 4: Verify build with `npm run build`
- [ ] Step 5: Git commit task changes

### Task 7: My Tickets Feature (Digital Ticket Stub & Cancel Modal)
**Files:**
- Create: `src/components/Tickets/TicketStubCard.tsx`
- Create: `src/components/Tickets/CancelConfirmModal.tsx`
- Create: `src/pages/MyTicketsPage.tsx`

- [ ] Step 1: Build signature `TicketStubCard.tsx` with perforated border design, barcode simulation, and ticket metrics
- [ ] Step 2: Build `CancelConfirmModal.tsx` confirmation dialog
- [ ] Step 3: Build `MyTicketsPage.tsx` rendering active bookings and empty state
- [ ] Step 4: Verify build with `npm run build`
- [ ] Step 5: Git commit task changes

### Task 8: Routing, 404 & Full Application Integration & Verification
**Files:**
- Create: `src/pages/NotFoundPage.tsx`
- Modify: `src/App.tsx`

- [ ] Step 1: Configure full routes in `App.tsx` (`/`, `/show/:id`, `/my-tickets`, `*`)
- [ ] Step 2: Build `NotFoundPage.tsx` 404 page
- [ ] Step 3: Run comprehensive verification (`npm run build`, `npx oxlint`)
- [ ] Step 4: Git commit & push final implementation
