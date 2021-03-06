const OneUpRouter = require('express').Router();
const axios = require('axios');
const url = require('url');
const system_id = require('../settings').system_id;
const client_id = require('../settings').client_id;

OneUpRouter.get('/connect', (req, res) => {
    // Authorize EPIC app 
    let token = req.session.token;
    res.redirect(`https://api.1up.health/connect/system/clinical/${system_id}?client_id=${client_id}&access_token=${token}`);
    
});

OneUpRouter.get('/connect-url', (req, res) => {
    // Authorize EPIC app 
    let token = req.session.token;
    res.json({url: `https://api.1up.health/connect/system/clinical/${system_id}?client_id=${client_id}&access_token=${token}`});
    
});

OneUpRouter.get('/patient', async (req, res) => {
    let requestOptions = {
        headers: {
            "Authorization": `Bearer ${req.session.token}`
        }
    };

    try{
        let response = await axios.get('https://api.1up.health/fhir/dstu2/Patient', requestOptions);       
        let sessionData = req.session;
        sessionData.oneup_uid_url = response.data.entry[0].fullUrl;
        res.json({url: response.data.entry[0].fullUrl});
    } 
    catch(error) {
        console.log(error);
    }
});

OneUpRouter.get('/everything', async (req, res) => {
    let requestOptions = {
        headers: {
            "Authorization": `Bearer ${req.session.token}`
        }
    };

    // Parse query string and get url from there or use the one set in session
    let queryString = url.parse(req.url, true).query;
    let everythingUrl = queryString.url || req.session.oneup_uid_url + "/$everything";
    // console.log(queryString.url);
    try {
        let everythingResponse = await axios(everythingUrl, requestOptions);
        // console.log(everythingResponse.data.entry);
        // console.log(everythingResponse.data.link);
        // console.log(everythingResponse.data.total);
        res.json(everythingResponse.data);
    } 
    catch(e)  {
        console.log(e);
    }
});


module.exports = OneUpRouter;