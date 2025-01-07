import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import * as path from 'path';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  return {
    server: { host: true },
    plugins: [react()],
    define: { 'process.env': JSON.stringify(mode) },
    resolve: { alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }] },
  };
});
