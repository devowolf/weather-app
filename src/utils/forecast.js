// Import requests library and configure env
const request = require("postman-request");
require('dotenv').config()

const APIKey = process.env.WEATHERSTACK_API_KEY;

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=${APIKey}&query=${latitude},${longitude}`;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect with weather service.", undefined);
        } else if (body.error) {
            callback("Unable to find location.", undefined);
        } else {
            const forecastDescription = body.current.weather_descriptions[0];
            const {temperature, feelslike, precip} = body.current;
            callback(undefined, {forecast: forecastDescription, temperature, feelslike, precip,})
        }
    });
}

module.exports = forecast;