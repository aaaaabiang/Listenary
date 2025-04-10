import { defineConfig } from "vite";
import reactJsxPlugin from "@vitejs/plugin-react";
export default defineConfig({
  plugins: [reactJsxPlugin()],
  server: { 
    port: 8080,
    proxy:{
      '/api':{
        target:'https://api-free.deepl.com',
        changeOrigin:true, //*makes the proxy set the request's Origin and Host headers *
        // *to match the target server, so it looks like the request is coming from the same origin.*
        rewrite:(path)=>path.replace(/^\/api/, '')
      }
    }
   },
  build: { sourcemap: true, minify: false },
});
