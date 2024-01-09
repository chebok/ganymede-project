import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
      define: {
          'process.env.PORT': JSON.stringify(env.PORT),
      },
      plugins: [],
      server: { host: '0.0.0.0', port: 8000 },
      clearScreen: false,
  };
});
