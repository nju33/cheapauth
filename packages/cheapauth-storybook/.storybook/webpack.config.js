const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = ({config}) => {
  config.module.rules.push(
    {
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve('ts-loader'),
        },
        {
          loader: require.resolve('react-docgen-typescript-loader'),
        },
      ],
    },
  );

  config.resolve.extensions.push('.ts', '.tsx', '.vue');

  // config.resolve.alias.vue$ = 'vue/dist/vue.esm.js';

  config.resolve.plugins = [
    new TsconfigPathsPlugin({
      configFile: path.resolve(__dirname, '../tsconfig.json'),
    }),
  ];

  // config.plugins.push(new VueLoaderPlugin());
  // console.log(JSON.stringify(config.module.rules), null, 2);

  config.devServer = {
    inline: true,
    hot: true,
  };

  return config;
};
