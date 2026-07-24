# Movie Ticket Booking App

Aplikasi Katalog & Pemesanan Tiket Film berbasis React, TypeScript, dan Material UI (MUI) yang mengonsumsi data dari TVMaze API publik. Pemesanan tiket dikelola menggunakan Redux Toolkit dan disimpan secara persisten di `localStorage`.

## 🚀 Fitur Utama

- **Pencarian Film**: Cari judul film menggunakan search bar (MUI TextField) dengan auto-debounce 500ms.
- **Katalog Film**: Menampilkan hasil pencarian dalam layout responsive grid MUI Card (Poster, Judul, Genre, Rating).
- **Detail Film**: Halaman detail dinamis (`/show/:id`) yang memuat poster HD, summary HTML, rating, genre, dan form pemesanan tiket.
- **Simulasi Pesan Tiket**: Pengguna memilih jadwal tayang dan jumlah tiket (1-10) untuk ditambahkan ke global state Redux.
- **Tiket Saya (`/my-tickets`)**: Halaman khusus untuk melihat semua tiket yang dipesan (tabel MUI) lengkap dengan fitur pembatalan tiket.
- **Persistensi Data**: Sinkronisasi data tiket dengan `localStorage` menggunakan custom middleware Redux.

---

## 🛠️ Tech Stack & Dependencies

- **Frontend Core**: React 18, TypeScript 5, Vite (Build Tool)
- **UI & Styling**: Material UI (MUI) v5 (`@mui/material`, `@emotion/react`, `@emotion/styled`), MUI Icons (`@mui/icons-material`)
- **State Management**: Redux Toolkit (`@reduxjs/toolkit`), React Redux
- **Routing**: React Router DOM v6
- **Data Source**: [TVMaze API](https://www.tvmaze.com/api) (Public REST API)

---

## 📂 Struktur Folder Proyek

```text
movie-ticket-booking/
├── public/                 # Aset publik statis (favicon, svg)
└── src/
    ├── assets/             # Aset gambar & ilustrasi
    ├── components/         # Reusable UI components (FilmCard, LoadingState, dll)
    ├── hooks/              # Custom typed hooks Redux (useAppDispatch, useAppSelector)
    ├── pages/              # Komponen halaman (KatalogPage, DetailPage, TiketSayaPage)
    ├── store/              # Konfigurasi Redux Store, Slices, & LocalStorage Middleware
    ├── types/              # Deklarasi Type/Interface TypeScript (film.ts, booking.ts)
    ├── App.tsx             # Root component & Konfigurasi Route (React Router DOM)
    ├── main.tsx            # Entry point aplikasi
    └── vite-env.d.ts       # Type definitions untuk Vite
```

---

## 💻 Cara Instalasi & Menjalankan Proyek

### 1. Kloning / Buka Folder Proyek
Masuk ke direktori proyek:
```bash
cd C:\Users\LEGION\Documents\Bootcamp\project\movie-ticket-booking
```

### 2. Instalasi Dependensi
Jalankan perintah berikut untuk menginstal semua package wajib:
```bash
npm install
```

*Jika instalasi package tambahan MUI dan Redux belum terpasang otomatis:*
```bash
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material @reduxjs/toolkit react-redux react-router-dom
```

### 3. Jalankan Dev Server
Jalankan aplikasi di mode development:
```bash
npm run dev
```
Aplikasi akan berjalan secara lokal di `http://localhost:5173`.

### 4. Build untuk Produksi
Untuk kompilasi produksi (output di folder `dist`):
```bash
npm run build
```

---

## 📝 Catatan Data Simulasi (API TVMaze)
- Pencarian dan detail film langsung mengonsumsi data real-time dari:
  - Pencarian: `https://api.tvmaze.com/search/shows?q={query}`
  - Detail: `https://api.tvmaze.com/shows/{id}`
- Jadwal tayang dan harga tiket (`Rp50.000`) bersifat dummy di sisi client untuk kebutuhan simulasi pemesanan.
