import { loadAbort } from '../lib/loadAbort';

const baseUrl = import.meta.env.VITE_API_URL;

export const getProducts = (searchQuery: string, offSet: number = 0) => {
  const controller = loadAbort();

  return {
    call: fetch(
      `${baseUrl}/items?search=${searchQuery}&offset=${50 + offSet}`,
      {
        signal: controller.signal,
      }
    ),
    controller,
  };
};

export const getProduct = (id: string) => {
  const controller = loadAbort();

  return {
    call: fetch(`${baseUrl}/items/${id}`, {
      signal: controller.signal,
    }),
    controller,
  };
};
