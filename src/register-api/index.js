const ExpressHandler = require('./express-handler');

class RegisterApiEndpoint {
    static get PLUGINS() {
        return {
            EXPRESS: ExpressHandler,
        };
    }

    constructor(app, UsedPlugin) {
        this.app = app;
        this.plugin = new UsedPlugin(app);
    }

    get(...args) {
        return this.plugin.addGet(...args);
    }

    post(...args) {
        return this.plugin.addPost(...args);
    }
}

module.exports = RegisterApiEndpoint;