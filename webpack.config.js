const path = require('path');

module.exports = {
    entry: './src/app.jsx',
    output: {
        path: path.join(__dirname, 'public', 'js'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                exclude: /node_modules/,
                test: /\.js[x]?$/
            },
            {
                loader: 'css-loader',
                test: /\.css$/
            }
        ]
    }
};
