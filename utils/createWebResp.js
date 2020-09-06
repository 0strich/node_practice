const webResponse = require('./webResponse');

const createWebResp = (res, code, data) => {
  res.status(code).send(data);
};

const errorWebResp = (res, code, errorMessage, errorData) => {
  res.status(code).send(errorMessage);
};

module.exports.createWebResp = createWebResp;
module.exports.errorWebResp = errorWebResp;
