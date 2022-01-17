const { Container } = require('typedi');
const LoggerInstance = require('./logger');

module.exports = ({
  models,
}) => {
  try {
    models.forEach((m) => {
      Container.set(m.name, m.model);
    });
    // logger injected into container
    Container.set('logger', LoggerInstance);

  } catch (e) {
    LoggerInstance.error('🔥 Error on dependency injector loader: %o', e);
    throw e;
  }
};
