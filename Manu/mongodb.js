const mongoose = require('mongoose');
const config = require('../settings');
const EnvVar = require('./mongodbenv');

const defaultEnvVariables = [
    { key: 'PREFIX', value: '.' },
    { key: 'AUTO_READ_STATUS', value: 'true' },
    { key: 'AUTO_READ_CMD', value: 'true' },
    { key: 'AUTO_TYPING', value: 'false' },
    { key: 'AUTO_BIO', value: 'false' },
    { key: 'AUTO_VOICE', value: 'false' },
    { key: 'MODE', value: 'public' },
    { key: 'ANTI_BAD', value: 'false' },
    { key: 'ANTI_BOT', value: 'false' },
    { key: 'ANTI_CALL', value: 'false' },
    { key: 'ANTI_PHOTO', value: 'false' },
    { key: 'ANTI_STICKER', value: 'false' },
    { key: 'ANTI_DELETE', value: 'true' },
    { key: 'AI_MODE', value: 'false' },
    { key: 'MOROCCO_BLOCK', value: 'false' },
    { key: 'ALWAYS_ONLINE', value: 'false' },
    { key: 'AUTO_RECORDING', value: 'false' },
];

// MongoDB connection function
const connectDB = async () => {
    try {
        await mongoose.connect(config.MONGODB);
        console.log('🛜 MongoDB Connected ✅');

        // Check and create default environment variables
        for (const envVar of defaultEnvVariables) {
            const existingVar = await EnvVar.findOne({ key: envVar.key });

            if (!existingVar) {
                // Create new environment variable with default value
                await EnvVar.create(envVar);
                console.log(`➕ Created default env var: ${envVar.key}`);
            }
        }

    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
