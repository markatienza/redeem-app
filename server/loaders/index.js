const expressLoader = require('./express');
const mongodbLoader = require('./mongodb');

module.exports = async ({ app }) => {
    await mongodbLoader();
    await expressLoader({ app });
}