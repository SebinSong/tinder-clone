const path = require('path');
const webpack = require('webpack');

// plugins
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const MiniCssPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

//regexes
const jsRegex = /\.js$/;
const imageRegex = [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/];
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(s[ac]ss)$/;
const sassModuleRegex = /\.module\.(s[ac]ss)$/;

// paths
const resolvePath = relPath => path.resolve(__dirname, relPath);
const appSrc = resolvePath('src');
const appHtml = resolvePath('public/index.html');
const appSass = path.join(appSrc, 'assets/scss')

// misc constants
const imageInlineSizeLimit = '10000'

module.exports = (webpackEnv) => {
  const isDevelopment = webpackEnv === 'development';
  const isProduction = webpackEnv === 'production';
  const publicPath = isProduction ? '' : isDevelopment && '/';

  const getStyleLoaders = (cssOptions = {}, isSass = false) => {
    const loaders = [
      isProduction && {
        loader: MiniCssPlugin.loader,
        options: {}
      },
      isDevelopment && {
        loader: require.resolve('style-loader')
      },
      {
        loader: require.resolve('css-loader'),
        options: cssOptions
      },
      {
        loader: require.resolve('postcss-loader'),
        options: {
          ident: 'postcss',
          plugins: () => [
            require('postcss-preset-env')()
          ]
        }
      }
    ].filter(Boolean);

    if (isSass) {
      loaders.push({
        loader: require.resolve('sass-loader'),
        options: {
          sassOptions: {
            includePaths: [ appSass ]
          },
          prependData: `@import 'variables';`
        }
      })
    }

    return loaders;
  }

  let config = {
    mode: webpackEnv,
    entry: [ './src/index.js' ],
    output: {
      filename: isProduction
        ? 'static/js/[name].[contenthash:8].js'
        : isDevelopment && 'static/js/bundle.js',
      chunkFilename: isProduction
        ? 'static/js/[name].[contenthash:8].chunk.js'
        : 'static/js/[name].chunk.js',
      path: resolvePath('dist'),
      publicPath: publicPath
    },
    devtool: isDevelopment? 'inline-source-map' : false,
    resolve: {
      alias: {
        "@": appSrc,
        "@scss": path.join(appSrc, 'assets/scss'),
        "@media": path.join(appSrc, 'assets/media')
      }
    },
    module: {
      rules: [
        {
          test: jsRegex,
          enforce: 'pre',
          exclude: /node_modules/,
          include: appSrc,
          use: [
            {
              loader: require.resolve('eslint-loader'),
              options: {
                eslintPath: require.resolve('eslint')
              }
            }
          ]
        },
        {
          oneOf: [
            {
              test: imageRegex,
              exclude: /node_modules/,
              use: [
                {
                  loader: require.resolve('url-loader'),
                  options: {
                    limit: imageInlineSizeLimit,
                    name: 'static/media/[name].[hash:8].[ext]'
                  }
                }
              ]
            },
            {
              test: jsRegex,
              exclude: /node_modules/,
              use: [
                {
                  loader: require.resolve('babel-loader'),
                  options: {
                    presets: [
                      '@babel/preset-env', 
                      '@babel/preset-react'
                    ],
                    plugins: [
                      '@babel/plugin-proposal-class-properties'
                    ],
                    cacheCompression: isProduction,
                    compact: isProduction
                  }
                }
              ]
            },
            {
              test: cssRegex,
              exclude: cssModuleRegex,
              use: getStyleLoaders()
            },
            {
              test: cssModuleRegex,
              use: getStyleLoaders({
                modules: true
              })
            },
            {
              test: sassRegex,
              exclude: sassModuleRegex,
              use: getStyleLoaders({}, true)
            },
            {
              test: sassModuleRegex,
              use: getStyleLoaders({
                modules: true
              }, true)
            },
            {
              loader: require.resolve('file-loader'),
              exclude: [ jsRegex, /\.html$/, /\.json$/ ],
              options: {
                name: 'static/media/[name].[hash:8].[ext]',
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlPlugin(
        Object.assign(
          {},
          {
            inject: true,
            template: appHtml
          },
          isDevelopment && {
            showErrors: true
          },
          isProduction && {
            minify: {
              removeComments: true,
              collapseWhitespace: true,
              removeRedundantAttributes: true,
              useShortDoctype: true,
              removeEmptyAttributes: true,
              removeStyleLinkTypeAttributes: true,
              keepClosingSlash: true,
              minifyJS: true,
              minifyCSS: true,
              minifyURLs: true,
            }
          }
        )
      ),
      isProduction && new MiniCssPlugin({
        filename: 'static/css/[name].[contenthash:8].css',
        chunkFilename: 'static/css/[name].[contenthash:8].chunk.css'
      }),
      isDevelopment && new webpack.HotModuleReplacementPlugin()
    ].filter(Boolean),
    optimization: {
      minimize: isProduction,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            parse: { ecma: 8 },
            compress: {
              ecma: 5,
              warnings: false,
              comparisons: false,
              inline: 2
            },
            mangle: { safari10: true },
            output: {
              ecma: 5,
              comments: false,
              ascii_only: true
            },
          },
          cache: true
        }),
        new OptimizeCssAssetsPlugin()
      ],
      splitChunks: {
        chunks: 'all',
        // remove this when
        name: isProduction ? false : true
      }
    }
  }

  if (isDevelopment) {
    Object.assign(
      config,
      {
        devServer: {
          hot: true,
          compress: true,
          overlay: true,
          contentBase: resolvePath('public')
        }
      }
    );
  }

  return config;
}