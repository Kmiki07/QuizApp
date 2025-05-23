import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/QuizSite/', // Replace <REPO_NAME> with your GitHub repo name
  plugins: [react()],
})
