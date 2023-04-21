const path = require('path');

module.exports = {
    entry: {
        app: './js/ui.js'
    },
    mode: 'development',
    output: {
        path: path.resolve(__dirname),
        filename: 'app.bundled.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                // use: {
                //     loader: 'babel-loader',
                //     options: {
                //         presets: ['@babel/preset-env']
                //     }
                // }
            }
        ]
    },
    devServer: {
        static: {
            directory: path.join(__dirname),
        },
        port: 9000,
        hot: true,
        open: true
    }
}