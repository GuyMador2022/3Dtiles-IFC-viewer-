import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  // Alias to fix web-ifc-three compatibility with modern Three.js
  resolve: {
    alias: {
      'three/examples/jsm/utils/BufferGeometryUtils': resolve(__dirname, 'src/utils/BufferGeometryUtilsPatch.js'),
      'web-ifc-three': resolve(__dirname, 'node_modules/web-ifc-three/IFCLoader.js'),
    },
  },
  
  // כתובת השרת לפיתוח
  server: {
    port: 3000,
    host: '0.0.0.0',
    cors: true,
    // Headers נוספים לטיפול ב-CORS ו-WASM
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
    },
  },
  
  // תמיכה ב-WASM ו-Web Workers
  optimizeDeps: {
    exclude: ['web-ifc-three'],
    include: ['three'],
  },
  
  // הגדרות בילד
  build: {
    target: 'esnext',
    rollupOptions: {
      input: {
        main: 'index.html',
      },
      output: {
        // ניתן לגדול עד 10MB עבור קבצי WASM גדולים
        chunkSizeWarningLimit: 10000,
      },
    },
  },
  
  // תמיכה ב-WASM ו-Web Workers
  worker: {
    format: 'es',
  },
  
  // אפשר לטעון קבצים סטטיים מתיקיות נוספות
  publicDir: 'public',
  
  // הגדרת מסלולים עבור assets
  assetsInclude: ['**/*.wasm', '**/*.glb', '**/*.gltf', '**/*.ifc', '**/*.b3dm'],
  
  // הגדרות נוספות עבור Three.js
  define: {
    // מונע בעיות עם Three.js ב-production
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
  },
});