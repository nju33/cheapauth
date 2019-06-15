const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: path.join(__dirname, 'src/index.ts'),
  devServer: {
    inline: true,
    hot: true,
  },
  resolve: {
    extensions: ['.js', 'jsx', 'json', '.ts', '.tsx', '.vue'],
    plugins: [new TsconfigPathsPlugin()],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: 'ts-loader',
          },
        ],
      },
    ],
  },
  plugins: [new HtmlPlugin()],
};
