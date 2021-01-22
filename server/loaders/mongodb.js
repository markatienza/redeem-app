const mongoose = require('mongoose');
const config = require('../config');

module.exports = async () => {
	let connection = null;
	try {
		mongoose.Promise = global.Promise;
		const db = mongoose.connection;

		db.on('connecting', () => {
			console.info('MongoDB is connecting');
		});
		db.on('connected', () => {
			console.info('MongoDB is connected');
		});
		db.once('open', () => {
			console.info('MongoDB connection opened');
		});
		db.on('reconnected', () => {
			console.info('MongoDB reconnected');
		});
		db.on('disconnected', () => {
			console.warn('MongoDB disconnected');
			connection = mongoose.connect(config.mongodb.url, config.mongodb.config);
		});
		db.on('error', (error) => {
			console.error('MongoDB has error', error);
			mongoose.disconnect();
		});

		connection = await mongoose.connect(config.mongodb.url, config.mongodb.config);
	} catch (error) {
		console.error('Error in catch: ', error);
		return null;
	}

	return connection;
};