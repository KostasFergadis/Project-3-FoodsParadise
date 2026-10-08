const DEV_API_URL = "http://localhost:2002";
const PROD_API_URL = "https://kka5.onrender.com";
export const API_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.PROD ? PROD_API_URL : DEV_API_URL);
