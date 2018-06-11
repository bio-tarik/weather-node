const request = require('request');

request({
    url: 'http://maps.googleapis.com/maps/api/geocode/json?address=rua%20vergueiro%20500%20sao%20paulo',
    json: true
}, (error, response, body) => {
    console.log('body', JSON.stringify(body, undefined, 4));
});