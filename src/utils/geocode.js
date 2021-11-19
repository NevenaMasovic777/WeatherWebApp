const request = require("postman-request");


const getGeolocation = (address, callback) => {
    const accessToken = "pk.eyJ1IjoibmV2ZW5rYTc3NyIsImEiOiJja3cwb2R4ZTEwMGFkMndyMGE2bXN2aTdmIn0.ZAiMEesX2-fkTPIYQJHIzA"
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${accessToken}`;

    request({url, json: true}, (error, {body})=> {
            if(error){
                //hocemo error da prosledimo nazad u geoLocation
                callback('Unable to reach server', null); //data je null
            }
            else if (!body.features.length) {
                callback('Incorrect location, try another search', null);
            }
            else {
                callback(null, { //prosledjujemo data nazad u geoLocation, error je null
                    latitude: body.features[0].center[0],
                    longitude: body.features[0].center[1]
                });
            }
    });
}

const getWeather = (latitude, longitude, callback) => {
    const accessKey = "2302fa41e370c32bb7c647b4380f1c96"
    const url = `http://api.weatherstack.com//current?access_key=${accessKey}&query=${latitude},${longitude}&units=f`

    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to reach server.', null)
        }
        else if(body.error){
            callback('Request failed', null)
        }
        else {
            callback(null, {currentWeather: body.current.weather_descriptions[0]})
        } 
    })

}



//kada hocemo da vratimo podatke asinhronih funkcija onda to ide u callback
//prilikom poziva te funkcije i callback dela vadimo podatke
//kao sto is getGeolocation vadimo error i respp koji smo stavili u callback prilikom definisanja funkcije


module.exports = {
    getGeolocation: getGeolocation,
    getWeather: getWeather
}
