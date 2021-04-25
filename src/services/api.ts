import axios from "axios";

export const api = axios.create({
  baseURL: "https://plantmanager-api.vercel.app/api",
});
