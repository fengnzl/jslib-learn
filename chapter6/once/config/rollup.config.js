import { defineConfig } from 'rollup'

export default defineConfig({
  input: 'src/index.js',
  output: {
    format: 'cjs',
    file: 'dist/index.js'
  }
})
