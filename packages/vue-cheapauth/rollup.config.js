import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import vue from 'rollup-plugin-vue';
import replace from 'rollup-plugin-replace';
import babel from 'rollup-plugin-babel';

export default {
  input: 'src/components/cheapauth/sfc/index.vue',
  external: ['vue'],
  plugins: [
    nodeResolve(),
    commonjs(),
    typescript({
      clean: true,
      // > Does not work with plugin which containing async/await syntax #105
      // > https://github.com/ezolenko/rollup-plugin-typescript2/issues/105
      objectHashIgnoreUnknownHack: true,
    }),
    vue({template: {optimizeSSR: true}}),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    babel(),
  ],
};
