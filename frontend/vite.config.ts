import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
    }),
    babel({ presets: [reactCompilerPreset()] }),
    react(),
  ],
    server: {
        host: "0.0.0.0",
        hmr: {
            host: "localhost"
        },
        watch: {
            usePolling: true,
        },
        port: 80,
        proxy: {
            "/api": {
                target: "http://dev-backend:8080",
                changeOrigin: true,
            }
        }
    }
});
