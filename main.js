const input = document.getElementById('inputbox');
const submit = document.getElementById('submit');
const error = document.querySelector('.error');
const weatherDetails = document.querySelector('.weather-details');
const weatherIcon = document.querySelector('.weather-icon');
let API_key = "cab628e864172424cd4996eae1119e4f";
let URL = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;

async function checkWeather(city){
    let response = await fetch(URL + city + `&appid=${API_key}`);
    if(response.status == 404 || response.status == 400){
        error.style.display = 'block';
        weatherDetails.style.display = 'none';
    }else{
        error.style.display = 'none';
        let data = await response.json();
        document.querySelector('.temp').innerHTML = Math.floor(data.main.temp) + '°C';
        document.querySelector('.city').innerHTML = data.name;
        document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
        document.querySelector('.wind_speed').innerHTML = data.wind.speed + 'Km/h';
        
        if(data.weather[0].main == 'Clouds'){
            weatherIcon.src= 'img/clouds.png';
        }
        else if(data.weather[0].main == 'Clear'){
            weatherIcon.src= 'img/clear.png';
        }
        else if(data.weather[0].main == 'Rain'){
            weatherIcon.src= 'img/rain.png';
        }
        else if(data.weather[0].main == 'Drizzle'){
            weatherIcon.src= 'img/drizzle.png';
        }
        else if(data.weather[0].main == 'Mist'){
            weatherIcon.src= 'img/mist.png';
        }
        else if(data.weather[0].main == 'Humidity'){
            weatherIcon.src= 'img/humidity.png';
        }

        weatherDetails.style.display = 'block';
    }
}

submit.addEventListener('click', ()=>{
    let inputVal = input.value;  
    checkWeather(inputVal);
})

input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        let inputVal = input.value;  
        checkWeather(inputVal);
    }
})