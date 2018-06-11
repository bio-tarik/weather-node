const request = require('request');
const fs = require('fs');

const darkskyApiKey = fs.readFileSync(`${__dirname}/../apiKey.config`);

if (darkskyApiKey == 'API_KEY') {
    throw 'You need to configure the dark sky API key. Head over to the README file to get to know what that means.';
}

let getWeather = (latitude, longitude) => {
    request ({
        url: `https://api.darksky.net/forecast/${darkskyApiKey}/${latitude},${longitude}`,
        json: true
    }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            console.log(body.currently.temperature);
        } else {
            console.log('Unable to fetch weather.');
        }
    });
};

module.exports.getWeather = getWeather;