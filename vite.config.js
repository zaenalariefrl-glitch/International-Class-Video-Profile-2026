import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base './' supaya build bisa dibuka di GitHub Pages / hosting statis mana pun.
export default defineConfig({ plugins: [react()], base: './' });
