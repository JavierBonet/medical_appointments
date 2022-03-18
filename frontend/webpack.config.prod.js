const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const backend = {
  mode: 'production',
  entry: './backend/index.ts',
  target: 'node',
  output: {
    filename: 'bundle.[fullhash].js',
    path: path.resolve(__dirname, 'dist/backend'),
  },
  resolve: {
    modules: [__dirname, 'backend', 'node_modules'],
    extensions: ['*', '.js', '.jsx', '.tsx', '.ts'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: require.resolve('babel-loader'),
      },
    ],
  },
};

const frontend = {
  mode: 'production',
  entry: './frontend/index.tsx',
  devServer: {},
  output: {
    filename: 'bundle.[fullhash].js',
    path: path.resolve(__dirname, 'dist/frontend'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './frontend/public/index.html',
    }),
  ],
  resolve: {
    modules: [__dirname, 'frontend', 'node_modules'],
    extensions: ['*', '.js', '.jsx', '.tsx', '.ts'],
  },
  module: {
    rules: [
      {
        test: /\.ts$|tsx/,
        exclude: /node_modules/,
        loader: require.resolve('babel-loader'),
      },
      {
        test: /\.s?css$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.png|svg|jpg|gif$/,
        use: ['file-loader'],
      },
    ],
  },
};

module.exports = [backend, frontend];
