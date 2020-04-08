const path = require('path');
const assetsMove = require('copy-webpack-plugin');
module.exports = {
  mode: 'development',
  watch: true,
  entry: ['./src/index.tsx'],
  output: {
    path: __dirname + '/public',
    publicPath: 'build/',
    filename: 'bundle.js',
  },
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      'components': path.resolve(__dirname, 'src/components'),
      'store': path.resolve(__dirname, 'src/store'),
      'services': path.resolve(__dirname, 'src/services'),
      'config': path.resolve(__dirname, 'src/config'),
      'interfaces': path.resolve(__dirname, 'src/interfaces'),
      'utils': path.resolve(__dirname, 'src/utils'),
      'mocks': path.resolve(__dirname, 'src/mocks'),
      'errors': path.resolve(__dirname, 'src/errors')
    },
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(tsx|ts)?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new assetsMove(
      [
        {
          from: path.resolve(__dirname, 'assets/'),
          to: path.join(__dirname, 'public'),
        },
      ],
    ),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    liveReload: true,
    port: 9000,
    historyApiFallback: true,
    writeToDisk: true,
  },
};
