const path = require('path');
const merge = require('webpack-merge');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');
const baseConfig = require('./webpack.base.conf');

const config = merge(baseConfig, {
    entry: path.resolve(__dirname, '../entry/entry-server.js'),
    output: {
        libraryTarget: 'commonjs2'
    },
    target: 'node',
    context: path.resolve(__dirname, '../'),
    node: {
        __dirname: false,
        __filename: false,
    },
    plugins: [
        new VueSSRServerPlugin(),
    ],
});

module.exports = config;
