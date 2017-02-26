const { CheckerPlugin } = require('awesome-typescript-loader');
const path = require('path');

module.exports = {
    entry: './index.ts',
    target: 'node',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist'),
    },
    resolve: {
        extensions: ['.ts', '.js', '.tsx', '.jsx']
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                exclude: [/(node_modules)$/],
                loader: 'awesome-typescript-loader'
            }
        ]
    },
    plugins: [
        new CheckerPlugin()
    ]
};
