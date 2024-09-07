import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/": "https://ogmart-backend.onrender.com/",
      "/uploads/": "https://ogmart-backend.onrender.com/",
    },
  },
});