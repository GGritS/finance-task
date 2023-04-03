import { client } from "./client";
import { TICKERS_URL } from "./urls";

export const createTicker = (name: string) => {
  return client.post(TICKERS_URL, { name });
};

export const deleteTicker = (name: string) => {
  return client.delete(TICKERS_URL, { data: { name } });
};

export const getTickers = () => {
  return client.get(TICKERS_URL);
};
