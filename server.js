const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const http = require('http');
const request = require('request');

const config = {
    PORT: 9090,
    signalive: {
        url: 'https://api.signalive.io/v1/',
        token: 'your-api-token',
        channelIds: {
            datasource: 13123213,
            hdmi: 712312321321,
            slideshow: 79123123123
        },
        deviceId: 13123123123,
        datasourceId: 4213123123,
        datasourceToken: 'your-datasource-token'
    }
};


const app = express();

app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: false}));

// ROUTES

app.get('/', (req, res, next) => res.sendFile(path.resolve('index.html')));

app.post('/updateDatasource', (req, res, next) => {
    updateDatasource(req.body.jsonData)
        .then(_ => {
            res.status(200).end();
        });
});

app.post('/updateDevice', (req, res, next) => {
    updateDevice(req.body.channelName)
        .then(_ => {
            res.status(200).end();
        });
});

// NOT FOUND

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// ERROR

app.use(function(err, req, res, next) {
    res.status(500).json({Error: err.message});
});


const cookieJar = request.jar();

function login() {
    var options = {
        url: config.signalive.url + '/users/apikey/login',
        body: { token: config.signalive.token },
        json: true,
        jar: cookieJar
    };

    return new Promise((resolve, reject) => {
        request.post(options, function(error, response, body) {
            if (!error && response.statusCode == 202) return resolve();
            reject(new Error('Login failed!'));
        });
    });
};

function updateDatasource(jsonData) {
    var options = {
        url: `${config.signalive.url}/datasource/${config.signalive.datasourceId}/force`,
        headers: {'Authorization': config.signalive.datasourceToken},
        body: { data: jsonData },
        json: true,
        jar: cookieJar
    };

    console.log('Updating datasource with', options.body);

    return new Promise((resolve, reject) => {
        request.post(options, function(error, response, body) {
            if (!error && response.statusCode == 200) return resolve();

            console.log('Datasource Update failed!', body);
            reject(new Error('Datasource Update failed!'));
        });
    });
};

function updateDevice(channelName) {
    var options = {
        url: `${config.signalive.url}/devices/${config.signalive.deviceId}`,
        body: { channelId: config.signalive.channelIds[channelName] },
        json: true,
        jar: cookieJar
    };

    console.log('Updating device with', options.body);

    return new Promise((resolve, reject) => {
        request.put(options, function(error, response, body) {
            if (!error && response.statusCode == 200) return resolve();

            console.log('Device Update failed!',  body);
            reject(new Error('Device Update failed!'));
        });
    });
};


login()
    .then(_ => {
        console.log('Logged in successfully');

        app.set('port', config.PORT);
        const server = http.Server(app);
        server.listen(config.PORT);
    });
