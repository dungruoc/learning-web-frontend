import { defineConfig, transformWithOxc } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint'


// Custom plugin to enforce JSX parsing on .js files
const transformJsxInJs = () => ({
  name: "transform-jsx-in-js",
  enforce: "pre",
  async transform(code, id) {
    if (!id.match(/.*\.js$/)) {
      return null;
    }

    return await transformWithOxc(code, id, {
      lang: "jsx",
    });
  },
});

export default defineConfig({
  plugins: [
    react(),
    eslint(),
    transformJsxInJs()
  ],
  server: {
    port: 3000, // Keeps the default CRA port
    open: true, // Automatically opens the browser on start
  },
});