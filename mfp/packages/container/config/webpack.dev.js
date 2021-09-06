const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');
//const { module } = require('./webpack.common');

const devConfig = {
    mode: 'development',
    devServer: {
        port: 8087,
        historyApiFallback: {
            index: 'index.html'
        },
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'container',
            remotes: {
                marketing: 'marketing@http://localhost:8081/remoteEntry.js',
            },
            shared: packageJson.dependencies,
        }),
    ],
};

module.exports = merge(commonConfig, devConfig); // since devConfig is listed 2nd, it will override commonConfig