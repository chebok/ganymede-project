import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import viteTsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
      base: '',
      clearScreen: false,
      define: {
          'process.env.PORT': JSON.stringify(env.PORT),
      },
      plugins: [react(), viteTsconfigPaths()],
      server: {
        host: '0.0.0.0',
        open: true,
        port: 8000,
      },
  };
});
