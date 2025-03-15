import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";

const dotenv = require("dotenv");

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), nodePolyfills()],
  base: "/",
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "./src") }]
  }
});
