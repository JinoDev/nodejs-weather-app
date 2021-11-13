const request = require("postman-request");

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiamluYW1hIiwiYSI6ImNrdmp4cnQ4aThyNmsyb3M3bmluMGdhMHEifQ.8c58aMz-ncIuAR7EzO9yBg&limit=1`;
  
    request({url, json: true }, (error, {body}) => {
      if (error) {
        callback(`unable to connect to location services!`, undefined);
      } else if (body.features.length === 0) {
        callback(`unable to find location. Try another search.`, undefined);
      } else {
        callback(undefined, {
          longitude: body.features[0].center[0],
          latitude:  body.features[0].center[1],
          location:  body.features[0].place_name,
        });
      }
    });
  };

  module.exports = geocode