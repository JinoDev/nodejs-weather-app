const request = require("postman-request");

const forecast = (long, lat, cb) => {
  const url = `http://api.weatherstack.com/current?access_key=8a2819649f0f760c6b46598cf0533742&query=${lat},${long}`;  //&units=f

  request({url, json: true }, (error, {body}) => {
    if (error) {
      cb(`unable to connect to weather service!`, undefined);
    } else if (body.error) {
      cb(`Unable to find location`, undefined);
    } else {
      const current = body.current;
      console.log(body);
      cb(
        undefined,`${current.weather_descriptions[0]}. It's currently ${current.temperature} degrees out. It feels like ${current.feelslike} degrees out.`
        
      );
    }
  });
};

module.exports = forecast;
