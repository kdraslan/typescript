import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // gives the app JSX + Fast Refresh (hot reload)

// The course content is TypeScript, but the app shell rendering it is a small React + TS app.
export default defineConfig({
  plugins: [react()],
})
