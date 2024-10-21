const temp_span = document.querySelector('#temp')
const speed_span = document.querySelector('#speed')
const direction_span = document.querySelector('#direction')
const description_span = document.querySelector('#description')
const icon_img = document.querySelector('#img')

const url = 'https://api.openweathermap.org/data/2.5/weather?'
const icon_url = 'http://openweathermap.org/img/wn'
const api_key = '7818950906b759fbf533403f48e67e12'

const getLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude.toFixed(3)
            const lng= position.coords.longitude.toFixed(3)
        
            document.querySelector('#lat').innerHTML = lat + ', '
            document.querySelector('#lng').innerHTML = lng

            getWeather(lat, lng)

        }),(error => {
            alert(error)
        })
    } else {
        alert("Selaimesi ei tue paikannusta!")
    }
}

const getWeather = (lat, lng) => {
    const address = url +
    'lat=' + lat +
    '&lon=' + lng + 
    '&units=metric' + 
    '&appid=' + api_key
    
    axios.get(address)
        .then(response => {
            const json = response.data
            
            temp_span.innerHTML = json.main.temp + '&#176;C'
            speed_span.innerHTML = json.wind.speed + 'm/s'
            direction_span.innerHTML = json.wind.deg + '&#176;'
            description_span.innerHTML = json.weather[0].description
            
            const image = icon_url + json.weather[0].icon + '@2x.png'
            console.log 
            icon_img.src = image
        })
        .catch(error => {
            alert(error)
        })
}

getLocation()

