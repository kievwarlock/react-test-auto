const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const webpackMerge = require("webpack-merge");

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;


const commonConfig = {
    devtool: "source-map",
    entry: path.resolve(__dirname, 'src/app/app.tsx'),
    output: {
        filename: "js/[name].[hash].bundle.js",
        publicPath: '/',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "ts-loader",
                    }
                ]
            },
            {
                test: /\.scss$/,
                loader: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ]
            }, {
                test: /\.css$/,
                loader: [
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ]
            },
            {
                test:/\.svg$/,
                use: ["svg-inline-loader"]
            }
        ]
    },
    resolve: {
        extensions: [".js", "jsx", ".ts", ".tsx", ".json"],
        alias: {
            "@": path.resolve(__dirname, 'src/')
        }
    },
    plugins: [
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, "public"),
            to: path.resolve(__dirname, "dist"),
            ignore: ["*.html"]
        }]),
        new MiniCssExtractPlugin({
            filename: "css/[name].[hash].css",
        }),
        new HTMLWebpackPlugin({
            template: path.join(__dirname, "public", "index.html"),
        }),
    ],

};

const devConfig = {
    mode: "development",
    devServer: {
        compress: true,
        historyApiFallback: true,
        disableHostCheck: true,
        hot: true,
        port: 8000,
        stats: {
            normal: true
        }
    }
};

const prodConfig = {
    mode: "production",
    optimization: {
        minimizer: [
            new TerserWebpackPlugin({}),
            new OptimizeCssAssetsWebpackPlugin({})
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new BundleAnalyzerPlugin({
            openAnalyzer: false,
            analyzerMode: "static",
            reportFilename: path.resolve(__dirname, "report", "bundle-report.html")
        })
    ]
};

module.exports = webpackMerge(commonConfig, isProd ? prodConfig : devConfig);