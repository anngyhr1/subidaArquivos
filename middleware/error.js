const { error } = require("../startup/winston");

module.exports.error = function (err, req, res, next){
    console.log("in error");
    error({
        error: err,
        stack: err.stack, 
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
        file: req.files
      });
      
      const code = err.statusCode || 500;
      const message = err.statusCode ? err.message : 'Error no Servidor, tenta novamente';
      return res.status(code).send(message);
  }
