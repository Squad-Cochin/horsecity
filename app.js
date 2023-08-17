const path = require('path');


require('dotenv').config({
    path: path.resolve(__dirname + "/env", process.env.NODE_ENV + '.env')
});

if (process.env.NODE_MODE == 'start') {
    const cli = require('next/dist/cli/next-start');
    cli.nextStart(['-p', process.env.PORT || 3000]);
}
else {
    const cli = require('next/dist/cli/next-dev');
    cli.nextDev(['-p', process.env.PORT || 3000]);
}