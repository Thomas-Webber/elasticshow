const path = require('path');
const svgToMiniDataURI = require('mini-svg-data-uri');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CONFIG = require('./web/config.js');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (env, argv) => {
  const conf = { mode: argv.mode }
  if (argv.mode === 'production') {
    conf.optimization = {
      minimizer: [ new TerserPlugin({extractComments: false}) ],
    }
  }

  return {
    ...conf,
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
    entry: './src/index.js',
    
    output: {
      path: path.resolve(__dirname, 'web'),
      publicPath: '/',
      filename: 'bundle.js',
    },

    devServer: {
      contentBase: path.join(__dirname, 'web'),
      historyApiFallback: {
        index: '/index.html'
      }
    },

    plugins: [new HtmlWebpackPlugin({
      title: CONFIG.title,
      hash: true,
      minify: false,
      template: 'web/index.html.ejs',
      filename: 'index.html',
      inject: 'body',
      __date: Date.now()
    })],
  }
};