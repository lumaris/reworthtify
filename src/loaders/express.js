const bodyParser = require('body-parser');
const config = require('../config');
const routes = require('../api/routes');
const Filters = require('../models/filters');
module.exports.expressLoader = ({ app }) => {
  app.get('/status', (req, res) => {
    res.send({ uptime: process.uptime() }).status(200).end();
  });
  app.head('/status', (req, res) => {
    res.status(200).end();
  });

  // Middleware that save filters
  app.use(( req, res, next) => {
    const validTerm = ['id', 'name']
    const terms = req.query;
    for (let i = 0; i < validTerm.length; i++) {
      if (terms[validTerm[i]]) {
        const dataTerm = {
          term: validTerm[i],
          filter: terms[validTerm[i]],
          $inc: { search_num: 1 },
          path: req._parsedUrl.pathname,
        }
        const find = {
          term: validTerm[i],
          filter: terms[validTerm[i]],
          path: req._parsedUrl.pathname,
        }
        Filters.updateOne(find, dataTerm, { upsert: true }).exec()
      }
    }
    next();
  });

  // Middleware that transforms the raw string of req.body into json
  app.use(bodyParser.json());

  // Load API routes
  app.use(config.api.prefix, routes);

  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err['status'] = 404;
    next(err);
  });

  // error handlers
  app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
      return res.status(err.status).send({ message: err.message }).end();
    }
    return next(err);
  });

  app.use((err, req, res, next) => {
    res.status(err.status || err.response?.status|| 500);
    res.json({
      errors: {
        message: err.response?.data?.error?.message || err.message,
      },
    });
  });
};

