var config = {
    entry: './main.js',
    output: {
        path: '/',
        filename: 'index.js',
    },
    devServer: {
        proxy: {
            '/**': {  //catch all requests
                target: '/index.html',  //default target
                secure: false,
                bypass: function (req, res, opt) {
                    //your custom code to check for any exceptions
                    //console.log('bypass check', {req: req, res:res, opt: opt});
                    if (req.path.indexOf('/img/') !== -1 || req.path.indexOf('/public/') !== -1) {
                        return '/'
                    }

                    if (req.headers.accept.indexOf('html') !== -1) {
                        return '/index.html';
                    }
                }
            }
        }
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.scss$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader']
            },
        ]
    }
}
module.exports = config;