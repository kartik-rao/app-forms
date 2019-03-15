var path = require('path');
var webpack = require('webpack');
const tsImportPluginFactory = require('ts-import-plugin');

const env = process.env.NODE_ENV;
const HtmlWebpackPlugin = require('html-webpack-plugin');
var ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    mode: env,
    entry: {main: path.join(__dirname, 'src/index.tsx'), style: path.join(__dirname, 'src/app.css')},
    target: 'web',
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                use: { loader: 'ts-loader',
                    options : {
                        transpileOnly: true,
                        reportFiles: [
                            'src/**/*.{ts,tsx}'
                        ],
                        getCustomTransformers: () => ({
                            before: [ tsImportPluginFactory( {
                                libraryName: 'antd',
                                libraryDirectory: 'node_modules',
                                style: true
                              }) ]
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
                use: ExtractTextPlugin.extract({
                    allChunks: true, fallback: "style-loader", use: "css-loader"
                  }),
                include: /src\/app.css|node_modules\/antd\/|node_modules\/@aws\-amplify\//
            },
            {
                test: /\.svg/, loader: 'svg-inline-loader'
            }
        ],
    },
    devtool: 'eval-source-map',
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
        "antd" : "antd"
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
        new ForkTsCheckerWebpackPlugin(),
        new HtmlWebpackPlugin({template: 'public/index.html', inject: false}),
        new ExtractTextPlugin({filename:"style.css", allChunks: true})
    ],
    optimization: {
        minimize: true,
        splitChunks: { chunks: "initial", name: "vendor" }
    }
};