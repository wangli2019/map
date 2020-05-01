const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const webpack = require('webpack'); //to access built-in plugins
const path = require("path");

module.exports = {
    entry:'./src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "./build/bundle.js"
    },
    module: {
        rules:[{
            test:/\.js?$/,
            exclude:/(node_modules)/,
            loader:'babel-loader',
            options: {
                cacheDirectory: true,
                // stage-1 支持成员变量
                presets: [
                    require.resolve("babel-preset-env"),
                    require.resolve("babel-preset-es2015"),
                    require.resolve("babel-preset-react"),
                    require.resolve("babel-preset-stage-1"),
                    require.resolve("babel-polyfill"),
                ],
                plugins: [
                    // 装饰器支持
                    require.resolve("babel-plugin-transform-decorators-legacy"),
                    require.resolve("babel-plugin-transform-runtime"),
                    [require.resolve("babel-plugin-import"), [
                        {
                            "libraryName": "antd",
                            "libraryDirectory": "es",
                            "style": "less"
                        }
                    ]],
                ]
            }
        },
            {
                test: /\.(css)$/,
                use: [
                    "style-loader", {loader: "css-loader", options: {modules: true}}]
            },
        ],
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./public/index.html'
        })
    ],
    devServer:{
        contentBase: path.join(__dirname,'./dist'),
        open:true,
        port:9000
    }
}