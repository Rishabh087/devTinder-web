// import { defineConfig } from 'vite'
// import tailwindcss from '@tailwindcss/vite'
// import React from 'react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [],
// })
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
   optimizeDeps: {
    include: ['react-redux', '@reduxjs/toolkit'],
  },
})