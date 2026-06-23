import axios from 'axios';
import type { AxiosResponse } from 'axios';
import { type Movie } from '../types/movie';

// Переносимо інтерфейс відповіді сюди
interface TmdbResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

const movieInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    accept: 'application/json',
  },
});

export const fetchTrendingMovies = async (): Promise<TmdbResponse> => {
  const response: AxiosResponse<TmdbResponse> = await movieInstance.get(
    '/trending/movie/day'
  );
  return response.data;
};

export const searchMovies = async (query: string): Promise<TmdbResponse> => {
  const response: AxiosResponse<TmdbResponse> = await movieInstance.get(
    '/search/movie',
    {
      params: {
        query,
        include_adult: false,
        language: 'en-US',
        page: 1,
      },
    }
  );
  return response.data;
};