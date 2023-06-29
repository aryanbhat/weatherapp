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
const newsKey ='d058e50b3e824a54a2e1db3fb4e49202';
function getDataByCity(cityname){
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" +
    cityname +
    "&units=metric&appid=" +
    key).then(callback)
}

function callback(res){
    res.json().then((data)=>{
        let iconDesc = data.weather[0].main;
        if(iconDesc === 'Mist'){
            icon.src = "./images/mist.png";
        }
        else if(iconDesc == 'Clouds'){
            icon.src = "./images/clouds.png"
        }
        else if(iconDesc == 'Clear'){
            icon.src = "./images/clear.png"
        }
        else if(iconDesc == 'Drizzle' || iconDesc == 'Thunderstorm'){
            icon.src = "./images/drizzle.png"
        }
        else if(iconDesc == 'Rain' ){
            icon.src = "./images/rain.png"
        }
        else{
            icon.src = "./images/snow.png"
        }
        city.innerHTML = data.name;
        country.innerHTML = data.sys.country;
        main_desc.innerHTML = data.weather[0].main;
        temp.innerHTML = Math.floor(data.main.temp) + " &degC";
        humidity.innerHTML =data.main.humidity;
        wind.innerHTML = data.wind.speed + " km/h";
    }).catch((err)=>{
        alert("city not found!");
    });
}


function getfirstLocationIP(){
    fetch("https://api.geoapify.com/v1/ipinfo?&apiKey=cd74afa22743492591790e73d9eb7c21").then((res)=>{
        res.json().then((data)=>{
            getDataByCity(data.city.name);
        })
    })
}

function getfirstLocation(){
if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=cd74afa22743492591790e73d9eb7c21`).then((res)=>{
            res.json().then((data)=>{
                console.log(data);
                getDataByCity(data.features[0].properties.city);
            })
        })
      },
      (error) => {
        getfirstLocationIP();
      }
    );
  } else {
    console.error("Geolocation is not supported by this browser.");
  }
}

submit.addEventListener('click',(e)=>{
    const loc = inputSearch.value;
    getDataByCity(loc);
})

window.addEventListener('keyup',(e)=>{
    if(e.key == 'Enter'){
        getDataByCity(inputSearch.value);
    }
})
getfirstLocation();