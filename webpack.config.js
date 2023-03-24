const miniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
    entry: './index.html',
    mode: "development",
    devServer: {
        static: './dist',
        port: 3001,

    },
    stats: {
        children: false,
    },
    output: {
        filename: "main.js"
    },
    plugins: [
        new miniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            template: "./src/index.pug",
            filename: "index.html"
        }),
        new TerserWebpackPlugin(),
        new CssMinimizerWebpackPlugin(),
        new ESLintPlugin()
    ],
    optimization: {
        minimize: true,
        minimizer: [new TerserWebpackPlugin(), new CssMinimizerWebpackPlugin()]
    },
    module: {
        rules: [{
            use: [{
                loader: miniCssExtractPlugin.loader,
                options: {
                    esModule: true,
                },
            }, 'css-loader'],
            test: /\.css$/
        }, {
            test: /\.pug$/,
            loader: "pug-loader",
            options: {
                pretty: true
            }
        },
            {
                test: /\.ts$/,
                use: 'ts-loader'
            }]
    },

};
