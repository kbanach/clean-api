const Joi = require('joi');
const logger = require('winston-color');

const MethodWrapper = require('./method-wrapper');

class ExpressHandler {
    constructor(app) {
        this.app = app;
    }

    addGet(routePath, handler) {
        const method = new MethodWrapper(handler);

        this.app.get(routePath, (req, res) => {
            const { params, query, body } = req;
            const output = method.call({ params, query, body });

            res.status(200).json(output);
        });

        logger.debug(`Registered GET endpoint: \t${routePath}`);
    }

    addPost(
        routePath,
        handler,
        { inputSchema, outputSchema } = {}
    ) {
        const method = new MethodWrapper(handler);

        if (inputSchema) {
            method.setValidateInputFn(({ body }) => {
                const { error } = Joi.validate(body, inputSchema);

                if (error) {
                    throw error;
                }
            });
        }

        if (outputSchema) {
            method.setValidateOutputFn((output) => {
                const { error } = Joi.validate(output, outputSchema);

                if (error) {
                    throw error;
                }
            });
        }

        this.app.post(routePath, (req, res) => {
            const { params, query, body } = req;
            try {
                const output = method.call({ params, query, body });;
                res.status(200).json(output);
            } catch (err) {
                res.status(500).json({ error: err.message });
            }
        });

        logger.debug(`Registered POST endpoint: \t${routePath}`);
    }
}

module.exports = ExpressHandler;