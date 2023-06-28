const key = "47b542aba39d9abd0cd5b7d37d36077d";
const icon = document.querySelector('.icon');
const city = document.querySelector('.city');
const country = document.querySelector('.country');
const temp = document.querySelector('.temp');
const humidity = document.querySelector('.humidity');
const wind = document.querySelector('.wind');
const main_desc = document.querySelector('.main_desc');
const desc = document.querySelector('.description');
const inputSearch = document.querySelector('.citySearch');
const submit = document.querySelector('.search')
function getData(lat,lon){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`).then(callback);
}

function callback(res){
    res.json().then((data)=>{
        let iconcode = data.weather[0].icon;
        let iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
        icon.src = iconurl;
        city.innerHTML = data.name;
        country.innerHTML = data.sys.country;
        main_desc.innerHTML = data.weather[0].main;
        desc.innerHTML = data.weather[0].description;
        temp.innerHTML = "Temp : " + data.main.temp + " &degC";
        humidity.innerHTML = "Humidity : " + data.main.humidity;
        wind.innerHTML = "Wind speed : " + data.wind.speed + " km/h";
        console.log(data);
    })
}

const limit = 1;
function getLatLon(cityname){
    let city = cityname;
    let state = "";
    let country = "";
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},${country}&limit=${limit}&appid=${key}`).then(callbackLatLon);
}
function callbackLatLon(res){
    res.json().then((data)=>{
        console.log(data);
        getData(data[0].lat,data[0].lon);
    })
}

getLatLon();

inputSearch.addEventListener('change',(e)=>{
    getLatLon(e.target.value);    
})
