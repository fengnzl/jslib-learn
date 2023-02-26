import { defineConfig } from 'rollup'
import { banner } from './rollup.cjs'
import { getCompile } from './getCompile.js'

export default defineConfig({
  input: 'src/index.js',
  output: {
    file: 'dist/index.aio.js',
    format: 'umd',
    name: 'clone',
    banner,
  },
  plugins: [getCompile()],
})
