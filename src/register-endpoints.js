const RegisterApi = require('./register-api');

const rootRoutes = require('./routes/root');
const itemRoutes = require('./routes/item');

function registerEndpoints(app) {
    const registerApi = new RegisterApi(app, RegisterApi.PLUGINS.EXPRESS);

    rootRoutes.registerRoutes(registerApi);
    itemRoutes.registerRoutes(registerApi);
}


module.exports = registerEndpoints;