const path = require('path');


// require('dotenv').config({
//     path: path.resolve(__dirname + "/env", process.env.NODE_ENV + '.env')
// });

const host = '0.0.0.0'; // Listen on all available interfaces
const port = process.env.PORT || 80; // Use an environment variable or a default

if (process.env.NODE_MODE === 'start') {
    const cli = require('next/dist/cli/next-start');
    cli.nextStart(['-p', port, '-H', host]);
} else {
    const cli = require('next/dist/cli/next-dev');
    cli.nextDev(['-p', port, '-H', host]);
}