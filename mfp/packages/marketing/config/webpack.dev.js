const { merge } = require('webpack-merge'); // allows us to merge 2 different files together
const HtmlWebpackPlugin = require('html-webpack-plugin');  // allows injection of script tages in HTML files
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');
//const { module } = require('./webpack.common');

const devConfig = {
    mode: 'development',
    devServer: {
        port: 8081,
        historyApiFallback: {  // this is for navigation in our app
            index: 'index.html'
        },
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'marketing',
            filename: 'remoteEntry.js',
            exposes: {
                './MarketingApp' : './src/bootstrap',
            },
            shared: packageJson.dependencies,
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ]
};

module.exports = merge(commonConfig, devConfig); // since devConfig is listed 2nd, it will override or take priority over any similar configurations in commonConfig