const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: './src-docs/index.js',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(md|mdx)$/,
        use: ['catalog/loader', 'raw-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: 'src-docs/index.html',
    }),
  ],
  output: {
    path: `${__dirname}/docs`,
    publicPath: '',
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: './docs',
    hot: true,
    port: 3051,
  },
};
