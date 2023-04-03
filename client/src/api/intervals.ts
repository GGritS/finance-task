import { client } from "./client";
import { INTERVAL_URL } from "./urls";

export const getInterval = () => {
  return client.get(INTERVAL_URL);
};

export const updateInterval = (duration: number) => {
  return client.post(INTERVAL_URL, { duration });
};
