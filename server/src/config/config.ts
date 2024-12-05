export const DEVELOPMENT = process.env.NODE_ENV === 'development';
export const PRODUCTION = process.env.NODE_ENV === 'production';
export const TEST = process.env.NODE_ENV === 'test';
export const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
export const API_ROOT = process.env.API_ROOT || '/api';
export const MELI_API_URL =
  process.env.MELI_API_URL || 'https://api.mercadolibre.com';

export const SERVER_CONFIG = {
  PORT,
  API_ROOT,
  MELI_API_URL,
};
