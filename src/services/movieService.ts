import axios from 'axios';
import type { AxiosResponse } from 'axios';
import { type TmdbResponse } from '../types/movie';
// Створюємо інстанс axios з базовими налаштуваннями
const movieInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    accept: 'application/json',
  },
});

// Функція для отримання популярних фільмів (приклад базового запиту)
export const fetchTrendingMovies = async (): Promise<TmdbResponse> => {
  const response: AxiosResponse<TmdbResponse> = await movieInstance.get(
    '/trending/movie/day'
  );
  return response.data;
};

// Функція для пошуку фільмів за ключовим словом
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