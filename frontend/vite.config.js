import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/": "https://ogmart.onrender.com:5000",
      "/uploads/": "https://ogmart.onrender.com:5000",
    },
  },
});