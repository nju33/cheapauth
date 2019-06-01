import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import vue from 'rollup-plugin-vue';

export default {
  input: 'src/components/cheapauth/sfc/index.vue',
  plugins: [
    nodeResolve(),
    commonjs(),
    typescript({
      clean: false,
      // > Does not work with plugin which containing async/await syntax #105
      // > https://github.com/ezolenko/rollup-plugin-typescript2/issues/105
      objectHashIgnoreUnknownHack: true,
    }),
    vue(),
  ],
};
