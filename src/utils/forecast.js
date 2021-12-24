const request = require("request")

const forecast = (lat, long, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=02a70658c7b881c66d246a9ff3dc6f12&query=" + lat + "," + long + "&&units=m"

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback("Unable to connect to weather service!", undefined)
        } else if (body.error) {
            callback("Unable to find location", undefined)
        } else {
            currentTemp = body.current.temperature
            feelLikeTemp = body.current.feelslike
            weatherDescrip = body.current.weather_descriptions
            currentHumidity = body.current.humidity
            callback (undefined, weatherDescrip[0] + ". It is currently " + currentTemp + " degrees out. It feels like " + feelLikeTemp + " degrees out. The humidity is " + currentHumidity +" %")
        }
    })
}

module.exports = forecast;