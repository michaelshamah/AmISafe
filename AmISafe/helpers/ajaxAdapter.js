'use strict'

const ajaxAdapter ={
  getPrecinct(num){
    return fetch('https://data.cityofnewyork.us/resource/sr25-u264.json?precinct=1', {
    method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
    data: {
      "$limit" : 5000,
      "$$app_token" : 'Vuhucydb64foApkAEPoNXonLz'
    }
    }).then(res=>{
      return res.json()
      }).then( res=> {
        console.log(res)
        return res
    })
  }
}
export default ajaxAdapter;
