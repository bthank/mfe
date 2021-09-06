const { merge } = require('webpack-merge');  // will allow us to merge common and dev or prod files
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json'); // this is required so that eventually webpack will take care of all the shared modules for us

// domain is going to be an environment variable that we set up and will be defined
// when we build our application through our CI/CD pipeline.  The environment variable
// will contain a string that identifies where our application is actually hosted.
const domain = process.env.PRODUCTION_DOMAIN;

// create prodConfig object
const prodConfig = {
    mode: 'production',  // mode of production will cause Webpack to run slightly differently and produce a production build
    output: {
        // this is a template for file names and to handle caching issues
        // this is done to avoid caching issues for files that could be named the same otherwise        
        filename: 'container/latest/[name].[contenthash].js',
        // publicPath: '/container/latest/',
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'container',
            // remotes identifies where we should go to get source code 
            remotes: {
                // the key 'marketing' needs to match up with the first part of some import statement in our container project
                // the ${domain} is interpolation for domain
                // the js file (remoteEntry.js) representing marketing will be contained in a folder named marketing at the domain ${domain}
                marketing: `marketing@${domain}/marketing/remoteEntry.js`        
            },
            // the shared files will come from packageJson.dependencies
            shared: packageJson.dependencies,
        }),
    ],
};

// we have to merge together and export our commonConfig and prodConfig that was just created above 
module.exports = merge(commonConfig, prodConfig);