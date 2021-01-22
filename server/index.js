require('dotenv/config');
const express = require('express');
const loaders = require('./loaders');
const config = require('./config');

(async () => {
    const app = express();

    // Load all the modules and configurations
    await loaders({ app });

    // Server will now run on the dedicated port
    app.listen(config.port, (error) => {
        if (error) {
            console.error(error);
            process.exit(1);
        } else {
            console.log('Client server is now running', { port: config.port });
        }
    });
})();