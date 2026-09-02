import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { readFileSync } from 'node:fs';

// Read the (just-bumped) version so it can be injected into the app.
const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8'));

export default defineConfig({
  plugins: [react({ include: /\.(jsx|tsx)$/ })],
  define: {
    // Bare version string, e.g. "1.1.4". Bumped on each build by prebuild.
    __APP_VERSION__: JSON.stringify(pkg.version)
  },
  server: {
    host: true, // listen on all addresses (useful for LAN/mobile tests)
    port: 5173,
    strictPort: true,
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 5173,
      clientPort: 5173
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
            'three/examples/jsm/controls/TransformControls.js',
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
