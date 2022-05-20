const path = require('path');
const HtmlWebPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        main: './src/index.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].js',
    },
    mode: 'development',
    devServer: {
        static: path.resolve(__dirname, './dist'),
        compress: true,
        port: 8080,
        open: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: "babel-loader",
                exclude: "/node-modules"
            },
            {
                test:/\.(FBX|jpg|fbx)/,
                type: 'asset/resource',
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, {
                    loader: 'css-loader',
                }],
            }
           
        ]
    },
    plugins: [
        new HtmlWebPlugin ({
            template: './src/index.html',
        }),
        new MiniCssExtractPlugin(),
    ]
}