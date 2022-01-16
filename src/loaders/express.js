const bodyParser =  require('body-parser');
const config = require('../config');
const { Router } =  require('express');
module.exports.expressLoader = ({ app }) => {
  app.get('/status', (req, res) => {
    res.send({ uptime: process.uptime() }).status(200).end();
  });
  app.head('/status', (req, res) => {
    res.status(200).end();
  });

  app.use(bodyParser.json());

  app.use(config.api.prefix, () => {
    const app = Router();
    ping(app);
  
    return app;
  });

  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err['status'] = 404;
    next(err);
  });

  app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
      return res.status(err.status).send({ message: err.message }).end();
    }
    return next(err);
  });

  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
      },
    });
  });
};

