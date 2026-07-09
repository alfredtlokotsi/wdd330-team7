import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",
  server: {
    fs: {
      allow: [
        // Allow the entire project directory
        resolve(__dirname),
        // Allow the src directory explicitly
        resolve(__dirname, "src"),
        // Allow the images directory specifically
        resolve(__dirname, "src", "images"),
        // Allow the tents directory specifically
        resolve(__dirname, "src", "images", "tents"),
        // Allow parent directory just in case
        resolve(__dirname, ".."),
      ],
    },
  },
  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        cart: resolve(__dirname, "src/cart/index.html"),
        checkout: resolve(__dirname, "src/checkout/index.html"),
        product1: resolve(
          __dirname,
          "src/product_pages/cedar-ridge-rimrock-2.html",
        ),
        product2: resolve(__dirname, "src/product_pages/marmot-ajax-3.html"),
        product3: resolve(
          __dirname,
          "src/product_pages/northface-alpine-3.html",
        ),
        product4: resolve(
          __dirname,
          "src/product_pages/northface-talus-4.html",
        ),
      },
    },
  },
});