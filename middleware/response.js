const { info } = require("../startup/winston");

module.exports.response = (req, res, next) => {
    console.log('in Response middleware');
  info({
    headers: req.headers,
    body: req.body,
    baseUrl: req.baseUrl,
    hostname: req.hostname,
    method: req.method,
    originalUrl: req.originalUrl,
    params: req.params,
    path: req.path,
    query: req.query,
    route: req.route,
    res: res.locals
  });

  const code = res.locals.code || 200;

  return res.status(code).send(res.locals.mensaje);
};