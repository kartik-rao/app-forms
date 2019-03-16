var path = require('path');
const env = process.env.NODE_ENV;

const tsImportPluginFactory = require('ts-import-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

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
                use: [MiniCssExtractPlugin.loader, "css-loader"],
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
        new MiniCssExtractPlugin({filename:"style.css", chunkFilename: "[id].css"}),
        // new BundleAnalyzerPlugin()
    ],
    optimization: {
        minimize: true,
        splitChunks: { chunks: "initial", name: "vendor" }
    }
};