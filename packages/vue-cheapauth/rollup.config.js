import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import cssOnly from 'rollup-plugin-css-only';
import vue from 'rollup-plugin-vue';
// import replace from 'rollup-plugin-replace';
// import babel from 'rollup-plugin-babel';

// Reason for commenting out
// -> https://github.com/vuejs/rollup-plugin-vue/issues/266
//
// export default {
//   input: 'src/components/cheapauth/sfc/index.vue',
//   external: ['vue'],
//   plugins: [
//     nodeResolve(),
//     commonjs(),
//     typescript({
//       clean: true,
//       // > Does not work with plugin which containing async/await syntax #105
//       // > https://github.com/ezolenko/rollup-plugin-typescript2/issues/105
//       objectHashIgnoreUnknownHack: true,
//     }),
//     vue({template: {optimizeSSR: true}}),
//     replace({
//       'process.env.NODE_ENV': JSON.stringify('production'),
//     }),
//     babel(),
//   ],
// };

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
    cssOnly(),
    vue({css: false}),
  ],
};
