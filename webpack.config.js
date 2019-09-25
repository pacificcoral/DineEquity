const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  target: 'node', // IMPORTANT!
  entry: {
    QueueTrigger: path.resolve(__dirname, './src/app/app.ts')
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    plugins: [
      new TsconfigPathsPlugin()
    ]
  },
  output: {
    filename: '[name]/app.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'commonjs' // IMPORTANT!
  }
};