import { babel } from '@rollup/plugin-babel'

export function getCompile(opt) {
  return babel({
    babelrc: false, // 不使用独立的 babel 配置文件
    babelHelpers: "bundled",
    presets: [
      [
        "@babel/preset-env",
        {
          targets: {
            browsers:
              "last 2 versions, > 1%, ie >= 8, Chrome >= 45, safari >= 10",
            node: "0.12",
          },
          modules: false, // 不使用独立的 babel 配置文件
          loose: true, // 更好的兼容IE8浏览器，避免使用 Object.defineProperty
        },
      ],
    ],
    plugins: [
      [
        "@babel/plugin-transform-runtime",
        {
          corejs: 3,
          helpers: false,
          regenerator: false,
        },
      ],
    ],
    exclude: "node_modules/**",
  });
}