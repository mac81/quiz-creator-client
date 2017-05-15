const path = require('path');
const express = require('express');
const httpProxy = require("http-proxy");
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.js');

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;
const app = express();
const apiProxy = httpProxy.createProxyServer();

if (isDeveloping) {

  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src'
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));

  // Proxy api requests
  app.use("/api/*", function(req, res) {
    req.url = req.baseUrl; // Janky hack...
    apiProxy.web(req, res, {
      target: {
        port: 3001,
        host: "localhost"
      }
    });
  });

  // app.get('*', function response(req, res) {
  //   console.log(middleware)
  //   res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
  //   //res.write(path.join(__dirname, 'index.html'));
  //   res.end();
  // });

  app.get('*', function(request, response) {
    response.sendFile(__dirname + '/index.html')
  });

} else {

  app.use(express.static(__dirname + '/dist'));

  app.get('*', function response(req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });

}

app.listen(port, 'localhost', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
});