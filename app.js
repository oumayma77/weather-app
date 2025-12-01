const apikey="2ec10c2ac21d7dc959becfd20239d298" ; 
const apiurl="https://api.openweathermap.org/data/2.5/weather?units=metric&q=" ; 

const searchbox = document.getElementById("cityinput");
const searchbtn = document.getElementById("searchbtn"); 
const weatherIcon = document.querySelector(".weather-icon");
const weatherDiv = document.querySelector(".weather");
//async : app will wait for API response / fetch:go get data from URL , await : dont continue until we get response 
async function checkWeather(city) { 
    const reponse = await fetch(apiurl + city + `&appid=${apikey}`) ; 
    if (reponse.status==404) { 
        alert("city not found") ; 
        return;
    } 
//reponse.json = deserialize the json text into a js object 
    const data =await reponse.json() ; 
    console.log(data) ; 

    document.querySelector(".cityname").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    if (data.weather[0].main == "Clouds") {
        weatherIcon.src = "images/clouds.png";
    } else if (data.weather[0].main == "Clear") {
        weatherIcon.src = "images/clear.png";
    } else if (data.weather[0].main == "Rain") {
        weatherIcon.src = "images/rain.png";
    } else if (data.weather[0].main == "Drizzle") {
        weatherIcon.src = "images/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
        weatherIcon.src = "images/mist.png";
    }

        weatherDiv.classList.add("active");
}

// When search button is clicked
searchbtn.addEventListener("click", () => {
    checkWeather(searchbox.value);
});

// When Enter key is pressed
searchbox.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        checkWeather(searchbox.value);
    }
}) ; 
