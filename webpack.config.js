var path = require('path');

const webpack = require('webpack');
const tsImportPluginFactory = require('ts-import-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const env = process.env.NODE_ENV || 'development';
const isDevelopment = env == 'development';

module.exports = {
    mode: env,
    entry: {
        main: path.join(__dirname, 'src/index.tsx')
    },
    target: 'web',
    module: {
        rules: [
            {
                test: /\.(jsx|tsx|js|ts)$/,
                use: {
                    loader: 'awesome-typescript-loader',
                    options : {
                        useCache: true,
                        reportFiles: [
                            'src/**/*.{ts,tsx}'
                        ],
                        getCustomTransformers: () => ({
                            before: [ tsImportPluginFactory( {
                                libraryDirectory: 'es',
                                style: 'css'
                              }) ]
                        }),
                        compilerOptions: {
                            module: 'es2015',
                            declaration: false
                        }
                    }
                },
                exclude: /\/node_modules\//
            },
            { test: /\.png$|\.eot$|\.woff$|\.ttf$/, loader: "url-loader?limit=100000" },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
                include: /src\/app.css|node_modules\/antd\/|node_modules\/@aws\-amplify\/|node_modules\/@kartikrao\//
            },
            {
                test: /\.svg/, loader: 'svg-inline-loader'
            }
        ],
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.ts', '.js', '.jsx', '.tsx', '.css'],
        alias: {
            mobx: __dirname + "/node_modules/mobx/lib/mobx.es6.js"
        }
    },
    output: {
        filename: '[name].js', /* Independent Entry Bundle */
        chunkFilename: '[name].chunk.js', /* Code splitting generated bundles */
        path: path.join(__dirname, 'dist'),
        publicPath : '/',
        libraryTarget: 'window',
        library: ''
    },
    externals: {
        "react": "React",
        "react-dom": "ReactDOM",
        "antd" : "antd",
        "moment" : "moment",
        "moment-timezone": "moment"
    },
    watchOptions: {
        ignored: /node_modules/
    },
    devServer: {
        compress: true,
        publicPath: "/",
        hot: true,
        port: 8085,
        historyApiFallback: true
    },
    plugins: [
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en-au/),
        new CheckerPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[name].[id].chunk.css',
            allChunks: true
        }),
        new HtmlWebpackPlugin({template: 'public/index.html', hash: true, title: 'app-forms'})
        //, new BundleAnalyzerPlugin()
    ],
    optimization: {
        runtimeChunk: isDevelopment,
        minimize: !isDevelopment,
        splitChunks: {
            cacheGroups: {
                default: false,
                vendors: false,
                // vendor chunk
                vendor: {
                    // sync + async chunks
                    chunks: 'all',
                    // import file path containing node_modules
                    test: /node_modules/,
                    priority: 20
                },
                common: {
                    name: 'common',
                    minChunks: 2,
                    chunks: 'async',
                    priority: 10,
                    reuseExistingChunk: true,
                    enforce: true
                }
            }
        }
    }
};