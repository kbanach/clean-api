function registerRoutes(registerApi) {
    registerApi.get('/', () => {
        return 'Hello world!';
    });
}

module.exports = {
    registerRoutes
};