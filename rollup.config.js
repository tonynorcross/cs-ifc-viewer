



import resolve from "@rollup/plugin-node-resolve";
import { babel, getBabelOutputPlugin } from '@rollup/plugin-babel';
import { terser } from "@chiogen/rollup-plugin-terser";

export default {
  input: "src/app.js",
  output: [
    {
      file: "dist/bundle.js",
      format: "esm",
      plugins: [getBabelOutputPlugin({ presets: ['@babel/preset-env'] })],
      // plugins: [terser()]
    },
  ],
  

  format: 'iife',
  sourceMap: 'inline',
  plugins: [
    resolve(),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      presets: [
          [
              '@babel/preset-env',
              {
                  targets: {
                      esmodules: true,
                  },
              },
          ],
          ['@babel/preset-flow'],
      ],
  }),


  ],
};