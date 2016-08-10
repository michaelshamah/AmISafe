const express    = require('express');
const logger     = require('morgan');
const bodyParser = require('body-parser')
const path       = require('path');
const fs         = ('fs')
const precintRoute = require('./controllers/felonies.js');
const app        = express()
const PORT       = process.env.PORT || 3000
app.set('views', path.join(__dirname, 'views'))

app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, 'public')))

app.use(logger('dev'));
app.use(bodyParser.json())

app.use('/felonies', precintRoute)

app.listen(PORT, function(){
  console.log('server is listening on ', PORT)
})
