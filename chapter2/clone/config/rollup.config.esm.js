import { defineConfig } from "rollup";
import { banner } from './rollup.cjs'
export default defineConfig({
  input: "src/index.js",
  output: {
    file: "dist/index.esm.js",
    format: "es",
    banner,
  },
});
