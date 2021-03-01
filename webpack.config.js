const path = require('path');
const svgToMiniDataURI = require('mini-svg-data-uri');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  devtool: 'eval',
  module: {
    rules: [
      { test: /\.css$/, use: 'css-loader' },
      { test: /\.(png|jpe?g|gif)$/i, use: 'file-loader' },
      { test: /\.js$/, use: 'babel-loader' },
      {
        test: /\.svg$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              generator: (content) => svgToMiniDataURI(content.toString()),
            },
          },
        ],
      }
    ],
  },
  output: {
    path: path.resolve(__dirname, 'web'),
    filename: 'index.bundle.js',
  },
  devServer: {
    contentBase: path.join(__dirname, 'web'),
    historyApiFallback: {
      index: 'index.html'
    }
  },
};