import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // GitHub Pages project site: https://kwtsang101016.github.io/sta2026_study_scheme_planner/
  base:
    process.env.NODE_ENV === "production"
      ? "/sta2026_study_scheme_planner/"
      : "/",
  plugins: [react()],
  server: {
    // Avoid ::1 (IPv6) EACCES on some Windows setups; use IPv4 loopback.
    host: "127.0.0.1",
    port: 3000,
    strictPort: false,
  },
  preview: {
    host: "127.0.0.1",
    port: 4174,
    strictPort: false,
  },
});
