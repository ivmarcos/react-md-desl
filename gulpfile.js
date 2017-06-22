const serverConfig = require('./server/config');
const createGulp = require('bb-common/gulp/create');

const gulpConfig = {
    server : serverConfig,
    serverPaths: [
        'public/**',
        'server/**'
    ]
}


const gulp = createGulp(gulpConfig);

