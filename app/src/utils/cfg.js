const { MODE, VITE_BACKEND_URL_DEV, VITE_BACKEND_URL_PROD } = import.meta.env

export const BACKEND_URL = MODE === 'development'
  ? VITE_BACKEND_URL_DEV
  : VITE_BACKEND_URL_PROD
