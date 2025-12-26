import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  base: "https://i300.github.io/cinema-club-wrapped/",
  plugins: [react(), tailwindcss()],
});
