// Required Modules
const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require(`${__dirname}/utils/geocode.js`);
const forecast = require(`${__dirname}/utils/forecast.js`);

// Parse and config .env data
require('dotenv').config()


// Create express app and set paths
const app = express()
const publicDirectory = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");


// set hostname and port from environment variables
const host = process.env.HOST;
const port = process.env.PORT;

// Handlebars configuration
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use( express.static(publicDirectory) );

// Global Configuration
const globalConfig = {
    siteTitle: "Weather App",
    author: "Sahil Saini",
};


// 
// Routes
// 

// Home / Index
app.get("", (req, res) => {
    res.render("index", {
        pageTitle: "Weather Search",
        content: "Use the form below to look for the weather of your location",
        ...globalConfig
    });
});

// About
app.get("/about", (req, res) => {
    res.render("about", {
        pageTitle: "About Me",
        content: "Weather App is a web application that utilizes the GeoCode api by MapBox and Weatherstack API to provide current weather details for a given location",
        ...globalConfig
    });
});

// Help
app.get("/help", (req, res) => {
    res.render("help", {
        pageTitle: "Help",
        content: "For help on anything or any queries related to the application. Contact me via the following channels.",
        ...globalConfig
    });
});

// Weather API, supposed to be utilized by index page
app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address",
        });
    }

    const address = req.query.address;
    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({
                error,
            });
        }

        // Generate weather data
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error,
                });
            }
            
            res.send({location, ...forecastData});
        });
    });
});

// 404 Routes
app.get("/help/*", (req, res) => {
    res.render("404", {
        errorMessage: "Help article not found.",
        pageTitle: "404",
        ...globalConfig
    });
});

app.get("*", (req, res) => {
    res.render("404", {
        errorMessage: "Help article not found.",
        pageTitle: "404",
        ...globalConfig
    });
});

// Start the server
app.listen(port, host, () => {
    console.log(`Server is up and running at http://${host}:${port}`);
})