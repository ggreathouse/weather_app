const my_key = config.APIKey
const my_client_id = config.client_id

const getPhotos = async (city) =>{
    let request = await fetch(`https://api.unsplash.com/search/photos/?query=${city}&client_id=${my_client_id}`,{
        method: 'GET'
    });  
    const response = await request.json()
    let pic = response.results[0].urls.regular
    console.log(pic)
    const html = `<img id = 'city-img' class="card-img" src="${pic}" alt="Card image">`
    document.querySelector(DOM_Elements.photo).insertAdjacentHTML('beforeend', html)
}


const getData = async (city, state) => {
    var state = 'us-' + state
    let request = new Request(`https://api.openweathermap.org/data/2.5/weather?q=${city},${state}&appid=${my_key}`,{
        method: 'GET'
    })
    let result = await fetch(request);
    let response = await result.json()
    console.log(response)
    return response
}

const DOM_Elements = {
    high : '.display-high',
    low : '.display-low',
    forecast : '.display-forecast',
    humidity : '.display-humidity',
    photo: '.card'
}

const getHigh = (high_temp, feels_like) =>{
    var temp = 1.8*(high_temp-273) +32
    var feels = 1.8*(feels_like-273) +32
    temp = Math.ceil(temp)
    feels = Math.ceil(feels)
    const html = `<h3>The High for Today is:</h3> 
                  <h4>${temp} ºF</h4>
                  <p>Feels like: ${feels} ºF</p>`
    document.querySelector(DOM_Elements.high).insertAdjacentHTML('beforeend', html)
}

const getLow = (low_temp) => {
    var temp = 1.8*(low_temp-273) +32
    temp = Math.ceil(temp)
    const html = `<h3>The Low for Today is:</h3> 
                  <h4>${temp} ºF</h4>`
    document.querySelector(DOM_Elements.low).insertAdjacentHTML('beforeend', html)
}

const getForecast = (forecast, icon) =>{
    const html = `<h3>The Forecast for Today is:</h3>
                  <div id='forecast'> 
                    <h4>${forecast}</h4> 
                    <img src="http://openweathermap.org/img/w/${icon}.png" alt="Icon Image">
                  </div>`
    document.querySelector(DOM_Elements.forecast).insertAdjacentHTML('beforeend', html)
}

const getHumidity = (humidity) => {
    const html = `<h3>The Humidity for Today is:</h3> 
                  <h4>${humidity}</h4>`
    document.querySelector(DOM_Elements.humidity).insertAdjacentHTML('beforeend', html)
}

 const loadData = async () =>{
    const weather = await getData(city.value, state.value);
     for (const key in weather){
         if (key == 'main'){
            getHigh(weather.main.temp_max, weather.main.feels_like)
            getLow(weather.main.temp_min)
            getHumidity(weather.main.humidity)
        }
        else if (key == 'weather'){
            getForecast(weather.weather[0].description, weather.weather[0].icon)
        }
     }
     getPhotos(city.value)
}

const clearData = () => {
    window.location.reload()
    }

const form = document.querySelector('#DataForm')
form.addEventListener('submit', (event) =>{
    event.preventDefault();
    let city = document.querySelector('#city');
    let state = document.querySelector('#state')
})

