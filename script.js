const cityInput = document.querySelector('#city-name')
const form = document.querySelector('form')
const weatherData = document.querySelector('.data')
const loading = document.querySelector('.loading')
const alertBox = document.querySelector('.alert')

//weather conditions backgrounds
const clearSkyDay = document.querySelector('#clear_sky_day')
const clearSkyNight = document.querySelector('#clear_sky_night')
const fewCloudsDay = document.querySelector('#few_clouds_day')
const fewCloudsNight = document.querySelector('#few_clouds_night')
const scatteredCloudsDay = document.querySelector('#scattered_clouds_day')
const scatteredCloudsNight = document.querySelector('#scattered_clouds_night')
const brokenCloudsDay = document.querySelector('#broken_clouds_day')
const brokenCloudsNight = document.querySelector('#broken_clouds_day')
const showerRainDay = document.querySelector('#shower_rain_day')
const showerRainNight = document.querySelector('#shower_rain_night')
const heavyRainDay = document.querySelector('#heavy_rain_day')
const heavyRainNight = document.querySelector('#heavy_rain_night')
const thunderstorm = document.querySelector('#thunderstorm')
const daySnow = document.querySelector('#day_snow')
const nightSnow = document.querySelector('#night_snow')
const mistDay = document.querySelector('#mist_day')
const mistNight = document.querySelector('#mist_night')

function resetOpacity() {
    clearSkyDay.style.opacity = '0'
    clearSkyNight.style.opacity = '0'
    fewCloudsDay.style.opacity = '0'
    fewCloudsNight.style.opacity = '0'
    scatteredCloudsDay.style.opacity = '0'
    scatteredCloudsNight.style.opacity = '0'
    brokenCloudsDay.style.opacity = '0'
    brokenCloudsNight.style.opacity = '0'
    showerRainDay.style.opacity = '0'
    showerRainNight.style.opacity = '0'
    heavyRainDay.style.opacity = '0'
    heavyRainNight.style.opacity = '0'
    thunderstorm.style.opacity = '0'
    daySnow.style.opacity = '0'
    nightSnow.style.opacity = '0'
    mistDay.style.opacity = '0'
    mistNight.style.opacity = '0'
}

const apiKey = 'dc3ad3b4c9097cc45f30d92ade5b2181'

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const fetchWeather = async function () {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}`)
        const responseJSON = await response.json()
        return responseJSON;
    }

    const data = fetchWeather()
    data.then((response) => {
        loading.style['display'] = 'none'
        let html = `
                <div class="city">${response.name},${response.sys.country}</div>
                <div class="weather-text">${response.weather[0].main}</div>
                <div class="weather-details">
                    <div class="weather-logo"><img src="https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png" alt=""></div>
                    <div class="weather-temp">${(response.main.temp - 273.15).toFixed(2)}°C</div>
                    <div class="min-max-container">
                        <div class="min">Min: ${(response.main.temp_min - 273.15).toFixed(2)}°C</div>
                        <div class="max">Max: ${(response.main.temp_max - 273.15).toFixed(2)}°C</div>
                    </div>
                </div>
        `
        weatherData.innerHTML = html
        switch (response.weather[0].icon) {
            case '01n':
                resetOpacity()
                clearSkyNight.style.opacity = '1'
                break;
            case '01d':
                resetOpacity()
                clearSkyDay.style.opacity = '1'
                break;
            case '03d':
                resetOpacity()
                scatteredCloudsDay.style.opacity = '1'
                break;
            case '03n':
                resetOpacity()
                scatteredCloudsNight.style.opacity = '1'
                break;
            case '02d':
                resetOpacity()
                fewCloudsDay.style.opacity = '1'
                break;
            case '02n':
                resetOpacity()
                fewCloudsNight.style.opacity = '1'
                break;
            case '04d':
                resetOpacity()
                brokenCloudsDay.style.opacity = '1'
                break;
            case '04n':
                resetOpacity()
                brokenCloudsNight.style.opacity = '1'
                break;
            case '09d':
                resetOpacity()
                showerRainDay.style.opacity = '1'
                break;
            case '09n':
                resetOpacity()
                showerRainNight.style.opacity = '1'
                break;
            case '10d':
                resetOpacity()
                heavyRainDay.style.opacity = '1'
                break;
            case '10n':
                resetOpacity()
                heavyRainNight.style.opacity = '1'
                break;
            case '11d':
                resetOpacity()
                thunderstorm.style.opacity = '1'
                break;
            case '11n':
                resetOpacity()
                thunderstorm.style.opacity = '1'
                break;
            case '13d':
                resetOpacity()
                daySnow.style.opacity = '1'
                break;
            case '13n':
                resetOpacity()
                nightSnow.style.opacity = '1'
                break;
            case '50d':
                resetOpacity()
                mistDay.style.opacity = '1'
                break;
            case '50n':
                resetOpacity()
                mistNight.style.opacity = '1'
                break;
            default:
                break;
        }
    }).catch((err) => {
        setTimeout(() => {
            alertBox.classList.remove('active-alert')
        }, 3000);
        alertBox.classList.add('active-alert')
    })
    loading.style['display'] = 'block'
    cityInput.value = ''
    weatherData.innerHTML = ''
})

