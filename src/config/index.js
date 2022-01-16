const config = {
  logs: {
    level: process.env.LOG_LEVEL,
  },
  databaseURL: 'mongodb://root:123456@mongodbLocal:27017/reworthtify?authSource=admin',
  api: {
    prefix: '/api',
  },
  port: parseInt(process.env.PORT, 10) || 8080,
};

module.exports = {
  ...config,
};
