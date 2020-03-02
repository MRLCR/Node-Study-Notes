const path = require('path');
const merge = require('webpack-merge');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');

const baseConfig = require('./webpack.base.conf');

const config = merge(baseConfig, {
    entry: path.resolve(__dirname, '../entry/entry-client.js'),
    devtool: 'source-map',
    plugins: [
        new VueSSRClientPlugin(),
    ],
});

module.exports = config;
