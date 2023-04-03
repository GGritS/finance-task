import axios from "axios";
import { BASE_URL } from "./urls";

export const client = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
