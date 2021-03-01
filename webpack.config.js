const HTMLWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const publicPath = '';

module.exports = {
    entry: './src/main.js',
    output: {
        path: __dirname + '/dist',
        filename: 'main.js',
        publicPath: publicPath,
    },
    performance: {
        hints: process.env.NODE_ENV === 'production' ? "warning" : false
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.html$/i,
                loader: 'html-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg|ico)$/,
                loader: 'file-loader',
            }
        ]
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './src/index.html'
        }),
    ]
}