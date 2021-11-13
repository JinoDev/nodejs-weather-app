const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

// console.log(__dirname);
// console.log(path.join(__dirname, '../public'));

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsDirectoryPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsDirectoryPath)
hbs.registerPartials(partialsPath)
// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Zhino'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Zhino'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Zhino', 
        helpText: 'This is some helpful text'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address;
    if (!address) {
      return res.send({
         error: 'You must provide a location.'
        })
    }

    geocode(address, (error, {longitude, latitude, location} = {}) => {
        if(error) {
         return res.send({error});
        } 
      
      forecast(longitude, latitude, (error, forecastData) => {
        if(error) {
          return res.send({error});
        }
    
       res.send({
          address: address,
          location:  location,
          forecast: forecastData
       });
      
      })
    })
})

app.get('/help/*', (req, res) => {
res.render('404',{
    title: '404',
    name: 'Zhino',  
    errMsg: 'Help article not found',
})
})

app.get('*', (req, res) => {
res.render('404', {
  title: '404',
  name: 'Zhino',  
  errMsg: 'Page not found'
})
})

app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`);
})