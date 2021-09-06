const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    module: {    // module object
        rules: [   // rules array
            {
                test: /\.m?js$/,  // process files that end in mjs or js
                exclude: /node_modules/, // do not run this on any file in node_modules directory
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react','@babel/preset-env'],
                        plugins: ['@babel/plugin-transform-runtime'],
                    },
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
    ],
};