const request = require('request');
const fs = require('fs');

const darkskyApiKey = fs.readFileSync(`${__dirname}/../apiKey.config`);

if (darkskyApiKey == 'API_KEY') {
    throw 'You need to configure the dark sky API key. Head over to the README file to get to know what that means.';
}

let getWeather = (latitude, longitude, callback) => {
    request ({
        url: `https://api.darksky.net/forecast/${darkskyApiKey}/${latitude},${longitude}?units=si`,
        json: true
    }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            callback(undefined, {
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            });
        } else {
            console.log('Unable to fetch weather.');
        }
    });
};

module.exports.getWeather = getWeather;