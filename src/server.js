const express = require('express');
const bodyParser = require('body-parser');

const registerEndpoints = require('./register-endpoints');

// create server
const app = express();

function errorHandler(err, req, res, next) {
    // TODO: validation errors registered in express-handler are not cought here


    if (res.headersSent) {
        return next(err)
    }

    res.status(500)
    res.render('error', { error: err })
}


app.use(bodyParser.json());
app.use(errorHandler);

registerEndpoints(app);

// run server
app.listen(3000, () => { console.log("Example app is running on port 3000") });