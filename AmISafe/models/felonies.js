var request = require('request');
apikey= process.env.NYC_OPEN_DATA
googlekey= process.env.Google_MAPS_API

function felonies(req, res, next){
  console.log(req.query)
  var lat= req.query.lat
  var long= req.query.long
  var url= `https://data.cityofnewyork.us/resource/e4qk-cpnv.json?$where=within_circle(location_1, ${lat}, ${long}, 50)`
  request({
    url: url,
    method: 'get',
    data: { "$limit" : 5000,
      "$$app_token" : apikey
    }
  }, (err, response, data)=>{
    if ( err ) throw err
    res.data= JSON.parse(data)
    next()
  })
}

function address(req, res, next){
  var adress= req.query.address
  var url= `https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=${googlekey}`
  request({
    url: url,
    method: 'get'
  }, (err, response, data)=>{
    if ( err ) throw err
    res.data= JSON.parse(data)
    next()
  })
}





module.exports= {felonies, address}
