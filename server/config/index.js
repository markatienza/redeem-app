module.exports = {
    port: process.env.PORT || '3000',
    api: {
        prefix: '/api',
        version: 'v1',
    },
    mongodb: {
        url: process.env.MONGODB_URI || 'localhost:27017',
        config: {
            useCreateIndex: true,
            useNewUrlParser: true,
            useFindAndModify: true,
            useUnifiedTopology: true,
            poolSize: 10,
            bufferMaxEntries: 0,
            autoIndex: true
        },
    },
    jwt: {
        exp: 60 * 60,
        secret: process.env.JWT_SECRET || '!@#*&^SADGNCZB(*@!&#(*@!&#(*@!&#ASD'
    }
}