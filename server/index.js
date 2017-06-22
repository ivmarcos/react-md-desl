const modulePath = require('app-module-path');
const logger = require('bb-common/logger');
const createApp = require('bb-common/app/create');

modulePath.addPath(__dirname);

const config = require('./config');

if (process.env.AMBIENTE == 'desenvolvimento') logger.transports.console.level = 'trace';

const app = createApp(config);

module.exports = app;
