# CineVerse - Modern Movie Ticket Booking Web Application

Aplikasi web bioskop modern **CineVerse** berbasis React 18, TypeScript, dan Material UI (MUI) v6 yang mengonsumsi data dari TVMaze Public REST API. Platform ini menyediakan pengalaman pemesanan tiket bioskop digital interaktif lengkap dengan pemilihan posisi kursi studio, jadwal waktu tayang real-time, autentikasi pengguna, mode tema (Dark/Light Mode), serta tampilan e-ticket fisik digital yang tersimpan persisten di Redux Toolkit & `localStorage`.

---

## Fitur Utama & Keunggulan

### 1. Katalog & Filter Film Interaktif (`/`)

- **Pencarian Real-Time**: Pencarian judul film menggunakan SearchBar dengan custom hook `useDebounce` 500ms untuk efisiensi API call.
- **Filter Genre Dinamis**: Filter chip genre (_Action, Drama, Comedy, Sci-Fi, Crime, Thriller, Adventure, Animation, Horror_). Mengklik chip genre otomatis melakukan query pencarian genre ke TVMaze API jika search bar kosong.
- **Katalog Populer Default**: Memuat daftar film populer secara otomatis dari TVMaze API saat pertama kali dibuka.
- **Movie Card Sleek UI**: Kartu film modern dengan rating bintang emas, tag genre, thumbnail HD, dan tombol pemesanan tiket cepat saat hover.

### 2. Halaman Detail & Pemesanan Tiket Bioskop (`/show/:id`)

- **Movie Hero Banner**: Banner sinematik dengan backdrop blur dari poster film, informasi runtime, bahasa, tahun rilis, rating, dan sinopsis yang disanitasi.
- **Pilih Tanggal Tayang**: Pemilihan hari/tanggal tayang bioskop (_Hari Ini, Besok, Lusa, dst._).
- **Validasi Jam Tayang Real-Time (`DateTimeNow`)**: Slot jam tayang yang sudah lewat dari jam lokal sekarang pada hari ini (_misal 10:00 WIB_) secara otomatis terkunci (_disabled_) dan tidak dapat dipilih.
- **Visual Cinema Seat Picker Grid**: Grid peta kursi studio bioskop (Baris A s/d E, Nomor 1 s/d 8) lengkap dengan status _Layar Bioskop_, _Tersedia_, _Terisi (Occupied)_, dan _Dipilih_.
- **Kalkulasi Otomatis**: Menghitung otomatis jumlah tiket, daftar nomor kursi (misal: `B2, B3, C4`), dan total biaya pembayaran (`Rp 50.000 / tiket`).

### 3. Sistem Autentikasi Pengguna (Login & Register Modal)

- **Modal Autentikasi (`AuthModal`)**:
  - Tab **Masuk (Login)**: Input Email & Password.
  - Tab **Daftar (Register)**: Input Nama Lengkap, Email, & Password.
  - Tombol **Masuk Cepat (Akun Demo)** untuk simulasi 1-klik.
- **Proteksi Pemesanan**: Jika pengguna belum login dan menekan tombol _"Pesan Tiket"_, modal login/register akan muncul secara otomatis.
- **Integrasi Profil Header**: Avatar dan Nama Pengguna beserta dropdown menu **Logout** di Navbar kanan.
- **Isolasi Tiket Pengguna (User Session Scoping)**: Tiket bioskop yang dipesan tersimpan secara eksklusif berdasarkan `userId` pengguna. Pengguna tamu (_unauthenticated_) tidak dapat melihat tiket milik pengguna lain.

### 4. Tiket Saya & Digital E-Ticket Stub (`/my-tickets`)

- **Perforated Ticket Stub Card**: Tampilan tiket fisik digital khas bioskop lengkap dengan kode barcode QR, ID Tiket, Judul Film, Tanggal & Jam Tayang, Nomor Kursi Terpilih, dan Total Pembayaran.
- **Pembatalan Tiket**: Modal konfirmasi pembatalan tiket lengkap dengan kalkulasi pengembalian dana (_refund_) dan pembaruan state instan.

### 5. Dynamic Dark Mode & Light Mode Theme Toggle

- **ThemeModeProvider**: Pengatur mode tema global berbasis React Context yang mendukung beralih antara **Mode Gelap (Cinematic Dark)** dan **Mode Terang (Clean Light)**.
- **High Contrast Styling**: Penyesuaian kontras warna otomatis pada teks, kartu film, hero banner, chip, dan modal dialog untuk keterbacaan maksimal di kedua mode tema.
- **Persistensi Tema**: Mode tema pilihan tersimpan secara persisten di `localStorage`.

---

## Tech Stack & Dependencies

- **Frontend Core**: React 18, TypeScript 5, Vite (Fast Build Tool & HMR)
- **UI Framework & Styling**: Material UI (MUI) v6 (`@mui/material`, `@emotion/react`, `@emotion/styled`)
- **SVG Icons**: `@mui/icons-material` (100% SVG Vector Icons, tanpa emoji)
- **State Management**: Redux Toolkit (`@reduxjs/toolkit`), React Redux
- **Routing**: React Router DOM v6 (dengan Code Splitting & React.lazy)
- **Typography**: Google Fonts (_Bebas Neue_ & _Plus Jakarta Sans_)
- **Data Source**: [TVMaze REST API](https://www.tvmaze.com/api) (Public Movies/Shows REST API)

---

## Struktur Folder Proyek

```text
movie-ticket-booking/
├── docs/                   # Dokumen PRD & Spesifikasi Desain Superpowers
├── public/                 # Aset statis (favicon, manifest)
└── src/
    ├── api/                # Service API TVMaze (fetchSearchShowsApi, fetchShowDetailApi)
    ├── assets/             # Aset gambar & ilustrasi
    ├── components/
    │   ├── Auth/           # Modal Login & Register (AuthModal.tsx)
    │   ├── Catalog/        # SearchBar, GenreFilter, MovieCard
    │   ├── Common/         # HeaderNav, Footer, LoadingSkeleton, ErrorAlert
    │   ├── Detail/         # MovieHero, BookingForm (Seat Map Grid)
    │   └── Tickets/        # TicketStubCard, CancelConfirmModal
    ├── context/            # ThemeModeContext.tsx (Dark/Light mode switcher)
    ├── hooks/              # Custom hook (useDebounce, Redux typed hooks)
    ├── pages/              # Halaman utama (CatalogPage, MovieDetailPage, MyTicketsPage, NotFoundPage)
    ├── store/              # Redux Store, slices (filmSlice, bookingSlice, authSlice), & localStorageMiddleware
    ├── theme/              # Konfigurasi MUI Theme (theme.ts - getCustomTheme)
    ├── types/              # Deklarasi Interface TypeScript (index.ts)
    ├── App.tsx             # Root Component & Layout Provider
    ├── index.css           # Global CSS & Glassmorphism styles
    └── main.tsx            # Entry point aplikasi
```

---

## Cara Instalasi & Menjalankan Proyek

### 1. Kloning / Masuk ke Folder Proyek

```bash

```

### 2. Instalasi Dependensi

```bash
npm install
```

### 3. Jalankan Dev Server

```bash
npm run dev
```

Buka browser Anda di `http://localhost:5173`.

### 4. Build untuk Produksi & Type-Check

```bash
npm run build
```

---

## Git Branching Strategy & Scheduled Timeline

Proyek ini dikembangkan menggunakan _Feature Branching Strategy_ dengan riwayat commit dan merge bertahap (_scheduled commit history_):

- **`develop`**: Branch integrasi utama seluruh fitur.
- **`feature/core-theme`**: Setup TypeScript types, Google Fonts, & MUI Theme dasar.
- **`feature/api-store`**: Service API TVMaze, Redux slices, & localStorage middleware.
- **`feature/catalog-page`**: SearchBar dengan debounce 500ms, Genre Filter, & Movie Card grid.
- **`feature/detail-page`**: Movie Hero backdrop, sinopsis, & kustomisasi detail film.
- **`feature/my-tickets`**: Halaman Tiket Saya & komponen perforated E-Ticket Stub.
- **`feature/auth-system`**: Modal Login & Register, Akun Demo, & Redux `authSlice`.
- **`feature/theme-toggle`**: Fitur Dark/Light Mode context & Header toggle switcher.
- **`fix/light-mode-contrast`**: Perbaikan kontras Light Mode & isolasi tiket per `userId`.

---

## Catatan Data API & Lisensi

- Data film diisi secara dinamis dari **[TVMaze Public API](https://www.tvmaze.com/api)**.
- Dibuat untuk kebutuhan tugas bootcamp / portofolio aplikasi web React & TypeScript.
