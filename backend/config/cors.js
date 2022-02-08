const cors = (options = {}) => {
  let { origin, headers, methods } = options;

  origin = origin
    ? origin
    : process.env.CLIENT_ORIGIN
    ? process.env.CLIENT_ORIGIN
    : '*';
  headers = headers ? headers : 'Content-Type';
  methods = methods ? methods : '*';

  return (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Headers', headers);
    res.setHeader('Access-Control-Allow-Methods', methods);
    next();
  };
};

module.exports = cors;
