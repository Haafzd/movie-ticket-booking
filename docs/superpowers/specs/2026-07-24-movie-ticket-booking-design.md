# Design Spec: Aplikasi Katalog & Pemesanan Tiket Film (CineVerse)

**Date:** 2026-07-24  
**Author:** AI Agent (Pair Programming)  
**Status:** Draft / Pending Approval  
**PRD Reference:** `docs/PRD_MovieTicketBooking_v1.0.md`  

---

## 1. Executive Summary & Intent

Aplikasi **CineVerse** adalah platform katalog film dan simulasi pemesanan tiket bioskop modern berbasis React 19, TypeScript, Material UI (MUI), Redux Toolkit, dan React Router DOM v7. Aplikasi ini mengambil data real-time dari TVMaze API publik, mendukung pencarian film dengan debouncing, detail film komprehensif, pemesanan tiket interaktif dengan pilihan jadwal & jumlah tiket, serta manajemen daftar tiket di halaman "Tiket Saya" dengan fitur pembatalan dan persistensi `localStorage`.

Untuk memastikan tampilan **tidak generic** (sesuai arahan UI/Frontend design):
- **Aesthetic Direction:** *Cinematic Dark Lux* (Midnight Obsidian backdrop `#090A0F`, Deep Slate `#12151E`, Crimson Accent `#E50914`, Metallic Gold `#FFD700`, Glassmorphism card overlays).
- **Typography:** Google Fonts (`Plus Jakarta Sans` & `Bebas Neue` / `Cinzel` untuk hero display titles).
- **Signature UI Element:** **Digital Ticket Stub (Tiket Fisik Digital)** dengan aksen perforasi gerigi bioskop, QR Code generator/simulasi, serta efek hover glow & status badge.

---

## 2. Architecture & Data Flow

### 2.1 Technical Stack
- **Framework:** React 19 + TypeScript + Vite
- **UI Component Library:** Material-UI (`@mui/material`, `@mui/icons-material`, `@emotion/react`, `@emotion/styled`)
- **State Management:** Redux Toolkit (`@reduxjs/toolkit`, `react-redux`)
- **Routing:** React Router DOM v7 (`react-router-dom`)
- **Sanitizer:** `dompurify` (atau penanganan HTML summary safe-parse)
- **API Source:** TVMaze API (`https://api.tvmaze.com`)
  - Endpoint Search: `GET /search/shows?q={query}`
  - Endpoint Detail: `GET /shows/{id}`

### 2.2 Application Directory Structure
```
src/
├── api/
│   └── tvmazeApi.ts              # Fetcher helper & TVMaze API types
├── assets/                       # Custom images / icons
├── components/
│   ├── Common/
│   │   ├── HeaderNav.tsx         # Navbar dengan logo glow & badge tiket aktif
│   │   ├── Footer.tsx            # Footer berkesan bioskop premium
│   │   ├── LoadingSkeleton.tsx   # MUI Skeleton custom dark style
│   │   └── ErrorAlert.tsx        # Toast/Alert error handler
│   ├── Catalog/
│   │   ├── SearchBar.tsx         # Input pencarian + MUI Debounce
│   │   ├── GenreFilter.tsx       # Filter chip genre film
│   │   └── MovieCard.tsx         # Card poster film dengan rating badge & hover zoom
│   ├── Detail/
│   │   ├── MovieHero.tsx         # Hero section detail film dengan backdrop blur
│   │   └── BookingForm.tsx       # Form pemesanan tiket (Jadwal, Jumlah, Price Calc)
│   └── Tickets/
│       ├── TicketStubCard.tsx    # Signature Ticket Stub component dengan perforasi
│       └── CancelConfirmModal.tsx# Dialog konfirmasi pembatalan tiket
├── context/
│   └── ThemeContext.tsx          # MUI Custom ThemeProvider setup
├── hooks/
│   ├── useDebounce.ts            # Custom hook debounce pencarian
│   └── useAppDispatchStore.ts    # Typed hooks useAppDispatch & useAppSelector
├── pages/
│   ├── CatalogPage.tsx           # Halaman Utama (Hero + Search + Grid Katalog)
│   ├── MovieDetailPage.tsx       # Halaman Detail Film + Form Booking
│   ├── MyTicketsPage.tsx         # Halaman Daftar Tiket Terpesan
│   └── NotFoundPage.tsx          # 404 Custom Page
├── store/
│   ├── index.ts                  # Redux Store configuration & localStorage middleware
│   ├── slices/
│   │   ├── filmSlice.ts          # State catalog, search, selected film, loading/error
│   │   └── bookingSlice.ts       # State list booking tiket & pembatalan
│   └── localStorageMiddleware.ts # Persistensi data `bookings` ke localStorage
├── theme/
│   └── theme.ts                  # MUI Theme customization (colors, typography, components override)
├── types/
│   └── index.ts                  # Type declarations (Show, Booking, State)
├── App.tsx                       # Router setup & Theme Provider
└── main.tsx                      # Root entry
```

---

## 3. Detailed Component & State Specifications

### 3.1 Redux State Schema

#### `filmSlice`
```typescript
interface FilmState {
  shows: Show[];
  selectedShow: ShowDetail | null;
  loading: boolean;
  error: string | null;
  searchQuery: string;
}
```

#### `bookingSlice`
```typescript
export interface TicketBooking {
  id: string; // UUID v4 / timestamp unique id
  showId: number;
  showTitle: string;
  posterUrl: string | null;
  schedule: string; // e.g. "14:30 WIB", "17:00 WIB", "19:30 WIB", "21:15 WIB"
  quantity: number;
  pricePerTicket: number; // Rp 50.000
  totalPrice: number;
  bookingDate: string; // ISO String
}

interface BookingState {
  bookings: TicketBooking[];
  lastBookedId: string | null;
}
```

### 3.2 Design System & Custom Styling (Non-Generic UX)

1. **Color Palette:**
   - Background default: `#090C15` (Deep Midnight Obsidian)
   - Paper / Card surface: `#121726` dengan border `#1E2640`
   - Primary Accent: `#E50914` (Cinematic Red) & Light Crimson `#FF2E4D`
   - Secondary Accent: `#FFD700` (Gold Star Rating / VIP badge)
   - Text Primary: `#F1F5F9`, Text Secondary: `#94A3B8`
2. **Components Elevation & Effects:**
   - Glassmorphism on Navbar & Cards (`backdropFilter: 'blur(16px)'`, `background: 'rgba(18, 23, 38, 0.75)'`).
   - Smooth hover micro-animations (`transform: translateY(-6px)`, glowing red shadow on card hover).
3. **Ticket Stub Card UI:**
   - Desain ala tiket bioskop fisik dengan bentuk dua bagian: kiri (detail film & barcode simulasi) dan kanan (stub informasi jumlah & tombol batalkan), dipisahkan garis putus-putus perforasi.

---

## 4. Requirement Traceability Matrix (PRD Coverage)

| PRD Req ID | Feature | Implementation Detail | Status |
|------------|---------|-----------------------|--------|
| **FR-01** | Pencarian Film | `SearchBar.tsx` + `useDebounce` (500ms) + `fetchShows` asyncThunk | Planned |
| **FR-02** | Katalog Film Cards | `MovieCard.tsx` + MUI Responsive Grid (1-4 columns) | Planned |
| **FR-03** | Loading & Error State | `LoadingSkeleton.tsx` & MUI Alert dengan tombol Retry | Planned |
| **FR-04** | Detail Film | `MovieDetailPage.tsx` + `MovieHero.tsx` dengan HD Poster & Safe HTML Summary | Planned |
| **FR-05** | Form Pemesanan Tiket | `BookingForm.tsx` (Select Jadwal, Select Quantity 1-10, Auto Calc Total Rp 50.000) | Planned |
| **FR-06** | Halaman Tiket Saya | `MyTicketsPage.tsx` dengan `TicketStubCard.tsx` | Planned |
| **FR-07** | Pembatalan Tiket | `CancelConfirmModal.tsx` + `cancelBooking` Redux action | Planned |
| **FR-08** | Persistensi Tiket | Redux Middleware ke `localStorage` (Key: `cineverse_bookings`) | Planned |
| **NFR-01** | Type Safety | TypeScript Strict Mode tanpa `any` | Planned |
| **NFR-02** | Responsiveness | Mobile to Desktop Layout (360px - 1920px) via MUI Grid | Planned |

---

## 5. Verification & Testing Plan

1. **Static Analysis & Type Checks:** `npm run build` (`tsc -b && vite build`) & `npx oxlint`.
2. **Functional Verification:**
   - Cari film ("batman", "dune", "spider"), pastikan debounce 500ms dan loading skeleton muncul.
   - Klik film untuk melihat detail & sinopsis HTML.
   - Pesan 2 tiket jadwal "19:30 WIB", pastikan total harga Rp 100.000 tercantum.
   - Buka halaman "Tiket Saya", pastikan tiket terpesan muncul dalam bentuk Ticket Stub UI.
   - Refresh browser, pastikan tiket tetap tersimpan (localStorage persistence).
   - Klik "Batalkan Tiket", konfirmasi dialog, dan verifikasi tiket terhapus dari state & localStorage.

---

## 6. Self-Review Checklist

- [x] Unambiguous specs & clear component boundaries? Yes.
- [x] Covers all FR-01 to FR-08 and NFR requirements? Yes.
- [x] Unique non-generic UI direction established? Yes (Cinematic Dark Lux + Ticket Stub design).
- [x] No placeholders or TODOs? Yes.
