import path from 'path';
import NuxtConfiguration from '@nuxt/config';
import {Module, Resolve, ResolvePlugin} from 'webpack';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';

const config: NuxtConfiguration = {
  build: {
    extend(config, {isClient}) {
      const resolve = config.resolve as Resolve;

      (resolve.plugins as ResolvePlugin[]) = [];
      (resolve.plugins as ResolvePlugin[]).push(new TsconfigPathsPlugin());

      // (resolve.modules as string[]).push(
      //   path.resolve(__dirname, '../../packages'),
      // );


      // const module = (config.module as Module);
      // console.log((config.module as any).rules)
    },
  },
};

export default config;
