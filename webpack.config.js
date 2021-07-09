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
    new CopyWebpackPlugin([{ from: 'img', to: 'img' }]), // Copy images
    new CopyWebpackPlugin([{ from: 'comments.json', to: 'comments.json' }]) // Copy comments.json
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
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  require('postcss-nested'),
                  require('postcss-simple-vars')({
                    variables: {
                      $xxl: '1400px',
                      $xxl_: '1399px',
                      $xl: '1200px',
                      $xl_: '1199px',
                      $lg: '992px',
                      $lg_: '991px',
                      $md: '768px',
                      $md_: '767px',
                      $sm: '576px',
                      $sm_: '575px'
                    }
                  }),
                  require('postcss-flexbugs-fixes'),
                  require('postcss-preset-env')({
                    autoprefixer: {
                      flexbox: 'no-2009',
                    },
                    stage: 3,
                  })
                ],
                ident: 'postcss',
                sourceMap: true
              }
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
