import NuxtConfiguration from '@nuxt/config';
import {Resolve, ResolvePlugin} from 'webpack';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';

const config: NuxtConfiguration = {
  build: {
    extend(config) {
      const resolve = config.resolve as Resolve;

      (resolve.plugins as ResolvePlugin[]) = [];
      (resolve.plugins as ResolvePlugin[]).push(new TsconfigPathsPlugin());
    },
  },
};

export default config;
