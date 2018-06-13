const yargs = require('yargs');
const axios = require('axios');
const fs = require('fs');

const darkskyApiKey = fs.readFileSync(`${__dirname}/apiKey.config`);

if (darkskyApiKey == 'API_KEY') {
    throw 'You need to configure the dark sky API key. Head over to the README file to get to know what that means.';
}

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

let encodedAddress = encodeURIComponent(argv.address);
let geocodeUrl = `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios
    .get(geocodeUrl)
    .then((response) => {
        if (response.data.status === 'ZERO_RESULTS')
            throw new Error('Unable to find that address');

        let latitude = response.data.results[0].geometry.location.lat;
        let longitude = response.data.results[0].geometry.location.lng;
        let weatherUrl = `https://api.darksky.net/forecast/${darkskyApiKey}/${latitude},${longitude}?units=si`;
        console.log(response.data.results[0].formatted_address);

        return axios.get(weatherUrl);
    }).then((response) => {
        let temperature = response.data.currently.temperature;
        let apparentTemperature = response.data.currently.apparentTemperature;

        console.log(`It's currently ${temperature} C. It feels like ${apparentTemperature} C.`);

    }).catch((error) => {
        if (error.code === 'ENOTFOUND')
            console.log('Unable to connect to the api servers.');
        else
            console.log(error.message);
    });