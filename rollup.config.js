import babel from "rollup-plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import postcss from "rollup-plugin-postcss";
import external from "rollup-plugin-peer-deps-external";
import { uglify } from "rollup-plugin-uglify";

const input = "./src/index.js";
const output = "./lib/index.js";
const minify = filePath => filePath.replace(/\.js$/, ".min.js");

export default [
  // CommonJS
  {
    input,
    output: {
      file: output,
      format: "cjs",
    },
    plugins: [
      external(),
      postcss({
        extract: false,
        modules: true,
        use: ["sass"],
      }),
      babel({
        exclude: "node_modules/**",
      }),
      resolve(),
      commonjs(),
    ],
  }, 
  {
    input,
    output: {
      file: minify(output),
      format: "cjs"
    },
    plugins: [
      external(),
      postcss({
        extract: false,
        modules: true,
        use: ["sass"],
      }),
      babel({
        exclude: "node_modules/**",
      }),
      resolve(),
      commonjs(),
      uglify()
    ]
  }
];
