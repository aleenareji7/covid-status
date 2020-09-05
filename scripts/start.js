'use strict';

process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';
process.on('unhandledRejection', err => {
  throw err;
});

require('../config/env');

const fs = require('fs');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const clearConsole = require('react-dev-utils/clearConsole');
const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles');
const {
  createCompiler,
  prepareProxy,
  prepareUrls,
} = require('react-dev-utils/WebpackDevServerUtils');
const openBrowser = require('react-dev-utils/openBrowser');
const paths = require('../config/paths');
const config = require('../config/webpack.config.dev');
const createDevServerConfig = require('../config/webpackDevServer.config');
const useYarn = fs.existsSync(paths.yarnLockFile);
process.stdout.isTTY = false;
const isInteractive = process.stdout.isTTY;

if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs])) {
  process.exit(1);
}

const port = parseInt(process.env.PORT, 10) || 3000;
const HOST = process.env.HOST || '0.0.0.0';

if (process.env.HOST) {
  console.log();
}
const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
const appName = require(paths.appPackageJson).name;
const urls = prepareUrls(protocol, HOST, port);
const compiler = createCompiler(webpack, config, appName, urls, useYarn);
compiler.plugin('done', stats => {
  console.log();
});
const proxySetting = require(paths.appPackageJson).proxy;
const proxyConfig = prepareProxy(proxySetting, paths.appPublic);
const serverConfig = createDevServerConfig(proxyConfig, urls.lanUrlForConfig);
const devServer = new WebpackDevServer(compiler, serverConfig);
devServer.listen(port, HOST, err => {
  if (err) {
    return console.log(err);
  }
  if (isInteractive) {
    clearConsole();
  }
  openBrowser(urls.localUrlForBrowser);
});

['SIGINT', 'SIGTERM'].forEach(function(sig) {
  process.on(sig, function() {
    devServer.close();
    process.exit();
  });
});
