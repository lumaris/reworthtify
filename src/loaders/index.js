const { expressLoader } = require('./express');
const dependencyInjectorLoader = require('./dependencyInjector');
const { mongooseLoader } = require('./mongoose');
const Logger = require('./logger');

module.exports.expressApp = async ({ expressApp }) => {
  const mongoConnection = await mongooseLoader();
  Logger.info('DB loaded and connected!');


  await dependencyInjectorLoader({
    mongoConnection,
    models: [],
  });

  await expressLoader({ app: expressApp });
  Logger.info('Express loaded');
};


