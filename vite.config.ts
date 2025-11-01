import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // listen on all addresses (useful for LAN/mobile tests)
    port: 5173,
    strictPort: true,
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 5173,
      clientPort: 5173,
      // If behind a reverse proxy, uncomment the next line to force base path
      // path: '/'
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Three.js core - biggest library
          'three-core': ['three'],
          // Three.js addons/examples
          'three-addons': [
            'three/examples/jsm/controls/OrbitControls.js',
            'three/examples/jsm/objects/Reflector.js'
          ],
          // React libraries
          'react-vendor': ['react', 'react-dom'],
          // React Three Fiber ecosystem
          'r3f': ['@react-three/fiber', '@react-three/drei'],
          // GUI and utilities
          'vendor-utils': ['dat.gui', 'file-saver']
        }
      }
    },
    chunkSizeWarningLimit: 400 // Lower warning threshold
  }
});
