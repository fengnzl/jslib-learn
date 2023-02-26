import { defineConfig } from "rollup";
import { banner } from "./rollup.js";
import babel from '@rollup/plugin-babel'
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";

export default defineConfig({
  input: "src/index.js",
  output: {
    file: "dist/index.aio.js",
    format: "umd",
    name: "clone",
    banner,
  },
  plugins: [nodeResolve(), commonjs(), babel({ babelHelpers: "bundled" })],
});
