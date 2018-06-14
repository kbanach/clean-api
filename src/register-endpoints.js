const Joi = require('joi');

const RegisterApi = require('./register-api');

function registerEndpoints(app) {
    const registerApi = new RegisterApi(app, RegisterApi.PLUGINS.EXPRESS);

    registerApi.get('/', () => {
        return 'Hello world!';
    });
    
    function handleItemCreate({ body }) {
        const { name } = body;
    
        return { output: 'Item ' + name + ' added' };
    }
    
    const handleItemCreateInputSchema = Joi.object().keys({
        name: Joi.string().alphanum().min(3).max(30).required(),
    });
    
    const handleItemCreateOutputSchema = Joi.object().keys({
        output: Joi.string().alphanum().min(3).max(30).required(),
    });
    
    registerApi.post(
        '/item',
        handleItemCreate,
        {
            inputSchema: handleItemCreateInputSchema,
            outputSchema: handleItemCreateOutputSchema,
        }
    );
    
}


module.exports = registerEndpoints;