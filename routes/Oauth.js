const RegisterRouter = require('express').Router();
const axios = require('axios');

// App and user data
const client_id = require('../settings').client_id;
const client_secret = require('../settings').client_secret;
const userData = require('../settings').userData;

// Register user
RegisterRouter.get('/register', (req, res) => {
    axios.post('https://api.1up.health/user-management/v1/user', userData)
    .then(response => {
        // Store code to session data
        let sessionData = req.session;
        sessionData.code = response.data.code;
        res.send(response.data);
    })
    .catch(e => {
        console.log(e);
        res.send(e);
    });
});

// Get code
RegisterRouter.get('/code', (req, res) => {
    axios.post('https://api.1up.health/user-management/v1/user/auth-code', userData)
    .then(response => {
        console.log(response.data);
        // Store code to session data
        let sessionData = req.session;
        sessionData.code = response.data.code;
        res.send(response.data);
    })
    .catch(e => {
        console.log(e);
        res.send(e);
    });
});

// Exchange Code for Token
RegisterRouter.get('/token', (req, res) => {
    // Exchange Code for token
    let exchangeTokenData = {
        client_id: client_id,
        client_secret: client_secret,
        code: req.session.code,
        grant_type: 'authorization_code'
    }

    axios.post('https://api.1up.health/fhir/oauth2/token', exchangeTokenData)
    .then(response => {
        // Store token in session 
        let sessionData = req.session;
        sessionData.token = response.data.access_token;

        res.send(response.data);
    })
    .catch(e => {
        console.log(e);
        res.send(e);
    });
});

module.exports = RegisterRouter;
    

