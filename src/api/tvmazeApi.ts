import type { SearchResult, Show } from '../types';

const BASE_URL = 'https://api.tvmaze.com';

export const fetchSearchShowsApi = async (query: string): Promise<Show[]> => {
  const response = await fetch(`${BASE_URL}/search/shows?q=${encodeURIComponent(query)}`);
  if (!response.ok) {
    throw new Error(`Gagal mengambil data film (${response.status})`);
  }
  const data: SearchResult[] = await response.json();
  return data.map((item) => item.show);
};

export const fetchShowDetailApi = async (id: number): Promise<Show> => {
  const response = await fetch(`${BASE_URL}/shows/${id}`);
  if (!response.ok) {
    throw new Error(`Gagal mengambil detail film #${id} (${response.status})`);
  }
  const data: Show = await response.json();
  return data;
};

export const fetchDefaultShowsApi = async (): Promise<Show[]> => {
  // Fetch popular/default shows list from TVMaze
  const response = await fetch(`${BASE_URL}/shows?page=1`);
  if (!response.ok) {
    throw new Error(`Gagal mengambil katalog film (${response.status})`);
  }
  const data: Show[] = await response.json();
  return data.slice(0, 36); // return top 36 shows
};
