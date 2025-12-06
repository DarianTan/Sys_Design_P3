import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/freetogame-api": {
        target: "https://www.freetogame.com/api",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/freetogame-api/, ""),
      },
      
      "/cheapshark-api": {
        target: "https://www.cheapshark.com",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/cheapshark-api/, ""),
      },
    },
  },
});
