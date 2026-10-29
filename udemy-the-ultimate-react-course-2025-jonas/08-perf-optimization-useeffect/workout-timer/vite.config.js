import react from '@vitejs/plugin-react'
import { defineConfig, transformWithOxc } from 'vite'
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


// https://vite.dev/config/
export default defineConfig(() => {

  return {
    plugins: [
      react(),
      eslint(),
      transformJsxInJs()
    ],
    resolve: {
      alias: {
        'react-dom/client': 'react-dom/profiling',
      },
    },
  }
})
