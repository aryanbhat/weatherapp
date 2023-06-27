const key = "47b542aba39d9abd0cd5b7d37d36077d";
function getData(lat,lon){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`).then(callback);
}

function callback(res){
    res.json().then((data)=>{
        console.log(data);
    })
}

const limit = 1;
function getLatLon(){
    let city = "Delhi";
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