import path from 'path';
import webpack from 'webpack';

import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import HtmlWebpackHarddiskPlugin from 'html-webpack-harddisk-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import LoadablePlugin from '@loadable/webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import nodeExternals from 'webpack-node-externals';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import safePostCssParser from 'postcss-safe-parser';
import TerserPlugin from 'terser-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import WebpackBar from 'webpackbar';

require('dotenv').config();

const isProd = process.env.NODE_ENV === 'production';
const isAnalyze = process.env.ANALYZE || false;

const cssFilename = isProd ? '[name].[contenthash:8].css' : '[name].css';

const PATHS = {
    node: path.join(__dirname, 'dist/node'),
    web: path.join(__dirname, 'dist/public/static'),
    public: '/static/',
};

const getConfig = target => {
    const isNode = target === 'node';

    return {
        target,
        name: target,
        mode: isProd ? 'production' : 'development',
        devtool: isProd ? '' : 'cheap-module-source-map',
        entry: [path.join(__dirname, `src/main-${target}`)],
        output: {
            path: PATHS[target],
            filename: isProd ? '[name].[contenthash:8].js' : '[name].js',
            chunkFilename: isProd ? '[name].[contenthash:8].chunk.js' : '[name].chunk.js',
            publicPath: '/static/',
            libraryTarget: target === 'node' ? 'commonjs2' : undefined,
        },
        optimization: !isNode
            ? {
                  minimize: isProd,
                  minimizer: [
                      new TerserPlugin({
                          terserOptions: {
                              parse: {
                                  ecma: 8,
                              },
                              compress: {
                                  ecma: 5,
                                  warnings: false,
                                  comparisons: false,
                                  inline: 2,
                                  pure_funcs: ['console.log', 'console.info'],
                              },
                              mangle: {
                                  safari10: true,
                              },
                              output: {
                                  ecma: 5,
                                  comments: false,
                                  ascii_only: true,
                              },
                          },
                          extractComments: false,
                          sourceMap: false,
                      }),
                      new OptimizeCSSAssetsPlugin({
                          cssProcessorOptions: {
                              parser: safePostCssParser,
                              // map: {
                              //     inline: false,
                              //     annotation: true,
                              // },
                          },
                          cssProcessorPluginOptions: {
                              preset: [
                                  'default',
                                  {
                                      discardComments: { removeAll: true },
                                      minifyFontValues: { removeQuotes: false },
                                  },
                              ],
                          },
                      }),
                  ],
                  concatenateModules: isProd,
                  noEmitOnErrors: isProd,
                  namedModules: !isProd,
                  runtimeChunk: isProd ? 'single' : false,
                  splitChunks: isProd
                      ? {
                            chunks: 'all',
                            // name: false,
                        }
                      : false,
              }
            : undefined,
        module: {
            strictExportPresence: true,
            rules: [
                {
                    parser: {
                        requireEnsure: false,
                    },
                },
                {
                    oneOf: [
                        {
                            test: /\.(js|jsx|mjs)$/,
                            loader: require.resolve('babel-loader'),
                            options: {
                                compact: isProd,
                                cacheCompression: false,
                                cacheDirectory: true,
                                caller: { target },
                            },
                        },
                        {
                            test: /\.svg$/,
                            loader: require.resolve('@svgr/webpack'),
                            issuer: {
                                test: /\.jsx?$/,
                            },
                        },
                        isNode && {
                            test: /\.css$/,
                            loader: require.resolve('css-loader'),
                            options: {
                                modules: {
                                    localIdentName: '[folder]__[local]__[hash:base64:5]',
                                },
                                onlyLocals: true,
                                url: true,
                            },
                        },
                        !isNode && {
                            test: /\.css$/,
                            use: [
                                {
                                    loader: MiniCssExtractPlugin.loader,
                                    options: {
                                        // only enable hot in development
                                        hmr: !isProd,
                                        // if hmr does not work, this is a forceful method.
                                        reloadAll: true,
                                    },
                                },
                                {
                                    loader: require.resolve('css-loader'),
                                    options: {
                                        importLoaders: 1,
                                        modules: {
                                            localIdentName: '[folder]__[local]__[hash:base64:5]',
                                        },
                                        sourceMap: false,
                                    },
                                },
                                {
                                    loader: require.resolve('postcss-loader'),
                                    options: {
                                        ident: 'postcss',
                                        plugins: [
                                            require('postcss-flexbugs-fixes'),
                                            require('postcss-preset-env')({
                                                autoprefixer: {
                                                    grid: 'autoplace',
                                                    flexbox: 'no-2009',
                                                },
                                                preserve: false,
                                                stage: 0,
                                                importFrom: './src/base.css',
                                            }),
                                            require('postcss-hexrgba'),
                                            require('postcss-color-function'),
                                        ],
                                    },
                                },
                            ],
                        },
                        {
                            loader: require.resolve('file-loader'),
                            exclude: [/\.(ejs|js|jsx|mjs)$/, /\.html$/, /\.json$/, /\.css$/],
                            options: {
                                emitFile: !isNode,
                                name: 'media/[name].[hash:8].[ext]',
                            },
                        },
                    ].filter(Boolean),
                },
            ],
        },
        plugins: [
            isProd &&
                new WebpackBar({
                    name: isNode ? 'server' : 'client',
                    color: isNode ? 'yellow' : 'green',
                }),
            new webpack.DefinePlugin({
                'process.env.GRAPHQL': JSON.stringify(process.env.GRAPHQL),
                'process.env.SERVER': isNode,
                SERVER: isNode,
                SEOHIDE: !isNode,
            }),
            isNode
                ? new webpack.optimize.LimitChunkCountPlugin({
                      maxChunks: 1,
                  })
                : new MiniCssExtractPlugin({
                      filename: cssFilename,
                  }),
            new LoadablePlugin({
                writeToDisk: true,
            }),
            isProd ? new CleanWebpackPlugin() : new CaseSensitivePathsPlugin(),
            isAnalyze && new BundleAnalyzerPlugin(),
            !isNode &&
                !isProd &&
                new HtmlWebpackPlugin({
                    alwaysWriteToDisk: true,
                    inject: true,
                    filename: path.resolve(__dirname, 'dist/public/index.html'),
                    chunksSortMode: 'none',
                    template: './index.html',
                }),
            !isNode && !isProd && new HtmlWebpackHarddiskPlugin(),
        ].filter(Boolean),
        resolve: {
            extensions: ['.js'],
            modules: ['node_modules', 'src'],
            alias: isProd
                ? {
                      'lodash-es': 'lodash',
                  }
                : {},
        },
        externals: isNode ? ['@loadable/component', nodeExternals()] : undefined,
        stats: {
            hash: false,
            version: false,
            children: false,
            modules: false,
            warnings: false,
            entrypoints: false,
        },
        performance: false,
        node: isNode ? undefined : isProd ? false : undefined,
    };
};

export default isAnalyze ? getConfig('web') : [getConfig('node'), getConfig('web')];
