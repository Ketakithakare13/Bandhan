import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      global: "globalthis", // Ensure global is mapped correctly
    },
  },
  define: {
    global: "window", // Manually define global
    "process.env": {},
  },
});
