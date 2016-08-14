const env        = process.env.NODE_ENV || 'development';
const DEV        = env==='development';
const dotenv     = (DEV) ? require('dotenv').config() : undefined;
const express    = require('express');
const logger     = require('morgan');
const bodyParser = require('body-parser')
const path       = require('path');
const felonyRoute = require('./controllers/felonies.js');
const userRoute  = require('./controllers/user.js')
const apiRoute   = require('./controllers/api.js')
const locationRoute  = require('./controllers/locations.js')
const app        = express()
const PORT       = process.env.PORT || 3000
app.set('views', path.join(__dirname, 'views'))
app.set('superSecret', 'Cash Money')

app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, 'public')))

app.use(logger('dev'));
app.use(bodyParser.json())

app.use('/felonies', felonyRoute)
app.use('/users', userRoute)
app.use('/api', apiRoute)
app.use('/locations', locationRoute)

app.listen(PORT, function(){
  console.log('server is listening on ', PORT)
})
