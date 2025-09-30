# React + TypeScript + Vite

Step 1:
git clone https://github.com/yangsaiyan/vitalz-test.git

Step 2:
npm install (or) yarn
#recommend using npm because shadcn has some issues with yarn

Step 3:
Make sure vite.config.ts same as following

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
plugins: [react(), tailwindcss()],
resolve: {
alias: {
"@": path.resolve(\_\_dirname, "./src"),
},
},
server: {
proxy: {
'/api': {
target: 'https://exam-vitalz-backend-8267f8929b82.herokuapp.com',
changeOrigin: true,
secure: false,
},
},
},
});

Step 4:
npm run dev (or) yarn dev
