var WebpackDevServer = require('webpack-dev-server');
var webpack = require('webpack');
var config = require('./webpack.config.js');

var compiler = webpack(config);
var server = new WebpackDevServer(compiler, {
    filename: config.output.filename,
    publicPath: config.output.publicPath,
    stats: {
        colors: true
    },
    proxy: {
        '/api/*': {
            target: 'http://localhost:3001',
            secure: false
        }
    }
});

server.listen(3000, 'localhost', function() {
    console.log('Server running');
});
