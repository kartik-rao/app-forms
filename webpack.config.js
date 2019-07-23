var path = require('path');
const webpack = require('webpack');
const tsImportPluginFactory = require('ts-import-plugin');
const tsImportPlugin = tsImportPluginFactory({ libraryName:"antd", style: 'css', libraryDirectory: 'es' })
const env = process.env.NODE_ENV;

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports = {
    mode: env,
    entry: {
        main: path.join(__dirname, 'src/index.tsx'),
        style: path.join(__dirname, 'src/app.css')
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
                            before: [ tsImportPlugin ]
                        }),
                        compilerOptions: {
                            module: 'es2015'
                        }
                    }
                },
                exclude: /\/node_modules\//
            },
            { test: /\.png$|\.eot$|\.woff$|\.ttf$/, loader: "url-loader?limit=100000" },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
                include: /src\/app.css|node_modules\/antd\/|node_modules\/@aws\-amplify\//
            },
            {
                test: /\.svg/, loader: 'svg-inline-loader'
            }
        ],
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.ts', '.js', '.jsx', '.tsx', '.css'],
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname, 'dist/'),
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
        publicPath: path.resolve("/"),
        hot: true,
        port: 8085,
        historyApiFallback: {
            index: 'public/index.html'
        }
    },
    plugins: [
        new CheckerPlugin(),
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en-au/),
        new HtmlWebpackPlugin({template: 'public/index.html', inject: false, hash: true, title: 'app-forms'}),
        new MiniCssExtractPlugin({filename:"style.css", chunkFilename: "[id].css"}),
        // new BundleAnalyzerPlugin()
    ],
    optimization: {
        minimize: false,
        splitChunks: { chunks: "initial", name: "vendor" }
    }
};