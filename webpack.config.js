/* eslint-disable global-require */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    devtool: 'inline-source-map',
    plugins: [
        new HtmlWebpackPlugin({
            title: 'MoonCharts',
            template: './src/index.html'
        })
    ],
    module: {
        rules: [{
            test: /\.scss$/,
            use: [{
                loader: 'style-loader' // creates style nodes from JS strings
            }, {
                loader: 'css-loader' // translates CSS into CommonJS
            }, {
                loader: 'sass-loader' // compiles Sass to CSS
            }]
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            use: [{
                loader: 'babel-loader',
                options: {
                    // we can configure babel-preset-env to only include the
                    // polyfills and transforms we need
                    presets: ['env'],
                    plugins: [
                        'transform-class-properties',
                        'transform-object-rest-spread'
                    ]
                }
            }]
        }]
    },
    devServer: {
        contentBase: './dist'
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
};
