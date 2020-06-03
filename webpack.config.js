const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackPugPlugin = require('html-webpack-pug-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')


module.exports = {
  entry: {
    script: './js/_script.js'
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build')
  },

  plugins: [
    // Generating HTML
    new HtmlWebpackPlugin({ template: 'pug/_index.pug', filename: 'index.html' }),
    new HtmlWebpackPugPlugin(),

    new MiniCssExtractPlugin({ filename: 'style.css' }), // Generating CSS
    new CopyWebpackPlugin([{ from: 'img', to: 'img' }]) // Copy images
  ],

  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin({})
    ],
  },

  module: {
    rules: [
      // HTML
      {
        test: /\.pug$/,
        loader: 'pug-loader'
      },

      // CSS
      {
        test: /\.css$/,
        use: [
          // Extract to external CSS file
          { loader: MiniCssExtractPlugin.loader },

          // Regular CSS
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
              sourceMap: true,
              url: false
            }
          },

          // PostCSS with plugins
          {
            loader: require.resolve('postcss-loader'),
            options: {
              ident: 'postcss',
              plugins: () => [
                require('postcss-nested'),
                require('postcss-flexbugs-fixes'),
                require('postcss-preset-env')({
                  autoprefixer: {
                    flexbox: 'no-2009',
                  },
                  stage: 3,
                })
              ],
              sourceMap: true
            }
          }
        ]
      }
    ]
  },

  // Development server
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    port: 4000,
    writeToDisk: true
  },

  mode: process.env.NODE_ENV || 'development'
}
