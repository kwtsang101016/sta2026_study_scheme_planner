import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
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
