// Add Event listener to form
const weatherForm = document.querySelector("form.weather-search");
const search = document.querySelector('input[name="address"]');
const errorElement = document.querySelector(".error");
const weatherElement = document.querySelector(".weather-data");


// Helper Functions
const writeError = (error) => {
    errorElement.textContent = error;
}
const removeError = () => {
    errorElement.textContent = "";
}
const writeForecast = ( {location, forecast, temperature, feelslike} ) => {
    weatherElement.textContent = `It is ${forecast} in ${location}. Temperature is ${temperature} and feels like ${feelslike}.`;
}


// Event listener and data fetch
weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();
    removeError();
    // Check if form value is empty
    if (!search.value) {
        weatherElement.textContent = "";
        writeError("Location can't be empty.")
        return;
    }

    weatherElement.textContent = "Loading...";
    const location = search.value;

    fetch("http://127.0.0.1:3000/weather?address=" + location)
    .then(response =>  response.json())
    .then(data => {
        if (data.error) {
            weatherElement.textContent = "";
            writeError(data.error);
        } else  {
            writeForecast(data);
            
        }
    });
});