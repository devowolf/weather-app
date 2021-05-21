// Import requests library and configure env
const request = require("postman-request");
require('dotenv').config()

const APIKey = process.env.GEOCODE_API_KEY;

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${APIKey}&limit=1`;

    request({ url, json: true }, (err, res) => {
        if(err) {
            callback("Unable to connect to location services.", undefined);
        } else if (res.body.features.length === 0) {
            callback("Unable to find location, try again with a different term.", undefined);
        } else {
            const dataObj = {
                longitude: res.body.features[0].center[0],
                latitude: res.body.features[0].center[1],
                location: res.body.features[0].place_name,
            };
            callback(undefined, dataObj);
        }
    });
};

module.exports = geocode;