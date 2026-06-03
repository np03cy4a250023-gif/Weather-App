let mainWeather=document.getElementById('mainweather');
let cityDisplay = document.getElementById("city");
let iconDisplay = document.getElementById("icon");
let weatherCondition=document.getElementById('weathercondition');
async function fetchWeatherData(city) {
    try{
        let response = await fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=77bd1954e05fa8cbec2ea41f49d8b51a&units=metric");
        if (!response.ok) {
            throw new Error("City not found");
        }
        let data = await response.json();
        console.log(data);
        document.querySelector("#city").innerHTML = data.name;
        document.querySelector("#temp").innerHTML = data.main.temp + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " m/s";
        document.querySelector(".pressure").innerHTML = data.main.pressure + " hPa";
        document.querySelector(".direction").innerHTML = data.wind.deg + "°";
        mainWeather.textContent = data.weather[0].description;
        weatherCondition.textContent = data.weather[0].main;
        if (data.weather[0].icon) {
            iconDisplay.src = "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
            iconDisplay.alt = data.weather[0].description;
        } else {
            iconDisplay.src = "default-icon.png"; 
            iconDisplay.alt = "No icon available";
        }
    }catch(error){
        alert("Error:" +error.message);
    }
}

fetchWeatherData("Fife");
const today = new Date();

document.getElementById("day").innerText =
  "Day: " + today.toLocaleDateString("en", { weekday: "long" });

document.getElementById("date").innerText =
  "Date: " + today.toLocaleDateString("en", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });

document.getElementById("button").addEventListener('click',
    function(e){
        e.preventDefault();
        let weatherData = document.getElementById('searchBox').value;
        fetchWeatherData(weatherData);
    }
)

