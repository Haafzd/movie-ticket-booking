export interface TVMazeImage {
  medium?: string;
  original?: string;
}

export interface TVMazeRating {
  average?: number | null;
}

export interface TVMazeSchedule {
  time?: string;
  days?: string[];
}

export interface Show {
  id: number;
  url?: string;
  name: string;
  type?: string;
  language?: string;
  genres: string[];
  status?: string;
  runtime?: number | null;
  averageRuntime?: number | null;
  premiered?: string;
  ended?: string | null;
  officialSite?: string | null;
  schedule?: TVMazeSchedule;
  rating?: TVMazeRating;
  weight?: number;
  image?: TVMazeImage | null;
  summary?: string | null;
  updated?: number;
}

export interface SearchResult {
  score: number;
  show: Show;
}

export interface TicketBooking {
  id: string; // Unique UUID/Timestamp ID
  showId: number;
  showTitle: string;
  posterUrl: string | null;
  schedule: string; // e.g. "14:30 WIB", "17:00 WIB", "19:30 WIB", "21:15 WIB"
  quantity: number;
  seats?: string[]; // e.g. ["A3", "A4"]
  pricePerTicket: number; // Rp 50.000
  totalPrice: number;
  bookingDate: string; // ISO string
}

export interface FilmState {
  shows: Show[];
  selectedShow: Show | null;
  loading: boolean;
  error: string | null;
  searchQuery: string;
  selectedGenre: string;
}

export interface BookingState {
  bookings: TicketBooking[];
  lastBookedId: string | null;
}
