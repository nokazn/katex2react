import babel from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import terser from 'rollup-plugin-terser';
import pkg from './package.json';

const extensions = ['tsx', '.ts', '.jsx', '.js'];

const setPlugins = () => {
  const plugins = [
    // adding peerDependencies to external
    peerDepsExternal({
      includeDependencies: true,
    }),
    typescript({
      typescript: require('typescript'),
      tslib: require('tslib'),
      include: ['*.{t,j}s+{,x}'],
      exclude: ['coverage', 'config', 'dist', 'example', 'node_modules', 'tests', '**/*.test.{t,j}s{x?}'],
    }),
    babel({
      extensions,
      exclude: 'node_modules',
      // used in conbimation with @babel/plugin-transform-runtime
      babelHelpers: 'runtime',
    }),
    // resolve cjs
    nodeResolve({ extensions }),
    // convert cjs to esm
    commonjs(),
  ];

  if (process.env === 'production') {
    plugins.push(terser());
  }
  return plugins;
};

export default {
  input: 'src/index.ts',
  output: [
    {
      dir: 'dist',
      file: pkg.module,
      format: 'es',
      sourcemap: true,
    },
    {
      dir: 'dist',
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      dir: 'dist',
      file: pkg['umd:main'],
      format: 'umd',
      sourcemap: true,
      global: {
        react: 'React',
      },
    },
  ],
  external: ['react'],
  plugins: setPlugins(),
};
