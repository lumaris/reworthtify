require('reflect-metadata');
const { createExpressServer } = require('routing-controllers');
const config = require('./config');
const Logger =  require('./loaders/logger');

async function startServer() {
  const app = createExpressServer({
    controllers: [],
  });

  await require('./loaders').expressApp({ expressApp: app });

  app.listen(config.port, (err) => {
    if (err) {
      Logger.error(err);
      process.exit(1);
    }
    Logger.info(`
      ################################################
         Server listening on port: ${config.port} 
      ################################################
    `);
  });
}

startServer();

