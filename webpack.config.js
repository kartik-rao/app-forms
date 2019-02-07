var path = require('path');
var webpack = require('webpack');

const env = process.env.NODE_ENV;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader')
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    mode: env,
    entry: {main: path.join(__dirname, 'src/app.tsx'), style: path.join(__dirname, 'src/app.css')},
    target: 'web',
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                use: { loader: 'awesome-typescript-loader',
                    options : {
                        reportFiles: [
                            'src/**/*.{ts,tsx}'
                        ]
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
                include: /src\/app.css|node_modules\/antd\//
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
        library: 'FormsApp'
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
        port: 8085
    },
    plugins: [
        new CheckerPlugin(),
        new HtmlWebpackPlugin({template: 'public/index.html', inject: false}),
        new ExtractTextPlugin({filename:"style.css", allChunks: true})
    ],
    optimization: {
        minimize: true,
        splitChunks: { chunks: "initial", name: "vendor" }
    }
};