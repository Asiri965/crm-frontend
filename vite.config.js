import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite"; // අලුතින් එකතු කරන පේළිය

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // අලුතින් එකතු කරන පේළිය
  ],
});
