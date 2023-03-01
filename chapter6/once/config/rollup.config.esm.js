import { defineConfig } from 'rollup'

export default defineConfig({
  input: 'src/index.js',
  output: {
    format: 'es',
    file: 'dist/index.esm.js'
  }
})
