const Joi = require('joi');


const handleItemCreateInputSchema = Joi.object().keys({
    name: Joi.string().min(3).max(30).required(),
});

const handleItemCreateOutputSchema = Joi.object().keys({
    result: Joi.string().min(3).max(30).required(),
});

function handleItemCreate({ body }) {
    const { name } = body;

    return { result: 'Item ' + name + ' added' };
}

function registerRoutes(registerApi) {
    registerApi.post(
        '/item',
        handleItemCreate,
        {
            inputSchema: handleItemCreateInputSchema,
            outputSchema: handleItemCreateOutputSchema,
        }
    );
}

module.exports = {
    registerRoutes
};