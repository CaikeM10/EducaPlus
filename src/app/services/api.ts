import axios from 'axios'
import type { ApiEnvelope } from '../../shared/types/api'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:3000',
  withCredentials: true,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use((response) => {
  const envelope = response.data as ApiEnvelope<unknown>;

  if (
    envelope &&
    typeof envelope === 'object' &&
    'success' in envelope &&
    'data' in envelope
  ) {
    response.data = envelope.data;
  }

  return response;
});
