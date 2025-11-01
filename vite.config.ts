import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: { port: 5173 },
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
