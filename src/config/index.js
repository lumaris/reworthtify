require('dotenv').config();

const config = {
  logs: {
    level: process.env.LOG_LEVEL,
  },
  databaseURL: 'mongodb://root:123456@localmongodb:27017/reworthtify?authSource=admin',
  api: {
    prefix: '/api',
  },
  port: parseInt(process.env.PORT, 10) || 8080,
  clientId: process.env.CLIENT_ID || '',
  clienteSecret: process.env.CLIENT_SECRET,
  spotifyAuthUrl: process.env.SPOTIFY_AUTH_URL,
  spotifyApiUrl: process.env.SPOTIFY_API_URL,
};

module.exports = {
  ...config,
};
