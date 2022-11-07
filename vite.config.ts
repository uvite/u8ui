import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { viteMockServe } from 'vite-plugin-mock'
import svgr from "vite-plugin-svgr";

export default defineConfig({
	resolve: {
		alias: {

      '@': resolve(__dirname, 'src'),
      // '@src': resolve(__dirname, './src'),
			// '@assets': resolve(__dirname, './src/assets'),
			// '@components': resolve(__dirname, './src/components'),
			// '@pages': resolve(__dirname, './src/pages'),
			// '@uitls': resolve(__dirname, './src/uitls'),
			// '@styles': resolve(__dirname, './src/styles'),
			// '@config': resolve(__dirname, './src/config'),
			'@mock': resolve(__dirname, './mock')
		}
	},
	plugins: [
		react({
      babel: {
        plugins: [
          ["@babel/plugin-proposal-decorators", { legacy: true }],
          ["@babel/plugin-proposal-class-properties", { loose: true }],
        ],
      },
    }),
		viteMockServe({
			mockPath: 'mock',
			localEnabled: true
		}),
    svgr(),
	],
	build: {
		target: 'es2015',
		minify: 'terser',
		cssCodeSplit: true,
		rollupOptions: {
			plugins: []
		},
    commonjsOptions: {
      transformMixedEsModules: true
    }
	},
	// server: {
	// 	proxy: {
	// 		'/api': {
	// 			target: '',
	// 			changeOrigin: true,
	// 			rewrite: (path: string) => path.replace(/^\/api/, '')
	// 		}
	// 	},
	// 	hmr: {
	// 		overlay: false
	// 	}
	// },
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:9999',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
})
