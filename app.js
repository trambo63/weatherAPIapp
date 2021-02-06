const baseURL = "https://api.openweathermap.org/data/2.5/weather";
const key = "23467fc4ff5f97589f94669c40eee388";
let url;
let urlString1 = "?q=";
let urlString2 = "&APPID=";
const searchCity = document.querySelector('.city-search');
const searchState = document.querySelector('.state-search');
const searchCountry = document.querySelector('.country-search');
const searchZip = document.querySelector('.city-zip');
const searchForm = document.querySelector('.form');
const searchButton = document.querySelector('.submit');


searchForm.addEventListener('submit', fetchResults);

function fetchResults(e){
    e.preventDefault();
    url = baseURL + urlString1 + searchCity.value + ","  + searchState.value + "," + searchCountry.value + urlString2 + key;
    console.log(searchCity.value)
    console.log(url);
    if(searchCity.value == ""){
        alert('Enter City!');
    }else{
        fetch(url)
        .then(function(result) {
            return result.json();
        }).then(function(json){
            displayResults(json);
            console.log(json);
        }).catch(function(){
            alert("404 City Not Found!")
        });
    }
}

function displayResults(json){
    const section = document.querySelector(".main");
    while (section.firstChild) {
        section.removeChild(section.firstChild);
    }
    let divHeader = document.createElement('div');
    divHeader.classList.add('main-header');
    let cityName = document.createElement('h1');
    let currentTemp = document.createElement('h2');
    let description = document.createElement('p');
    let divContent = document.createElement('div');
    divContent.classList.add('main-content');
    let maxTemp = document.createElement('h3');
    let minTemp = document.createElement('h3'); 
    let feelsLike = document.createElement('h3'); 
    let windSeed = document.createElement('h3'); 
    let humidity = document.createElement('h3'); 
    let airPressure = document.createElement('h3');

    let cityN = json.name;
    let cityUpper = cityN.toUpperCase();
    let temp = json.main.temp;
    let desc = json.weather[0].description;
    let descUpper = desc.toUpperCase();
    let tempMax = json.main.temp_max;
    let tempMin = json.main.temp_min;
    let feel = json.main.feels_like;
    let wind = json.wind.speed;
    let windD = json.wind.deg;
    let hum = json.main.humidity;
    let airP = json.main.pressure;

    cityName.innerHTML = cityUpper;
    currentTemp.innerText = "Temp: " + roundedTemp(temp);
    description.innerText =  descUpper;
    maxTemp.innerText = "Max Temp: " + roundedTemp(tempMax);
    minTemp.innerHTML = "Min Temp: " + roundedTemp(tempMin);
    feelsLike.innerHTML = "Feels like: " + roundedTemp(feel);
    windSeed.innerHTML = "Wind Speed: " + mpsToMph(wind) + "mph " + windDirection(windD);
    humidity.innerHTML = "Humidity: " + hum + "%";
    airPressure.innerHTML = "Air Pressure: " + milibarToHg(airP) + "Hg";


    section.appendChild(divHeader);
    divHeader.appendChild(cityName);
    divHeader.appendChild(currentTemp);
    divHeader.appendChild(description);
    section.appendChild(divContent);
    divContent.appendChild(maxTemp);
    divContent.appendChild(minTemp);
    divContent.appendChild(feelsLike);
    divContent.appendChild(windSeed);
    divContent.appendChild(humidity);
    divContent.appendChild(airPressure);

}

function windDirection(num){
    if (num >= 325 || num <= 25){
        return("N")
    }
    else if (num >= 25 && num <= 60){
        return("NE")
    }
    else if (num >= 60 && num <= 120){
        return("E")
    }
    else if (num >= 120 && num <= 145){
        return("SE")
    }
    else if (num >= 145 && num <= 205){
        return("S")
    }
    else if (num >= 205 && num <= 240){
        return("SW")
    }
    else if (num >= 240 && num <= 300){
        return("W")
    }
    else if (num >= 300 && num <= 325){
        return("NW")
    }
}

function mpsToMph(num) {
    let mph = num * 2.237;
    let mphRounded = Math.round(mph);
    return mphRounded;
}

function milibarToHg(num) {
    let hg = num / 33.864;
    let hgRounded = Math.round(hg);
    return hgRounded;
}

function roundedTemp(num){
    let tempFah = num * 1.8 - 459.67;
    tempRounded = Math.round(tempFah);
    return tempRounded + " F";
}

