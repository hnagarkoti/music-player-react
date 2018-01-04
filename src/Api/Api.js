var axios = require('axios');
var config = require('../config/index');

var axiosApi = axios.create({
  baseURL: config.endpoint+'/',
  headers: {
    "content-type": "application/json; charset=utf-8",
    "token": localStorage.getItem('token') || sessionStorage.getItem('token')
  },
  withCredentials: false,
})

// http://54.172.109.78:3001/show/15

// function setHeaders( cookie ){
//   return axiosApi.defaults.headers['Cookie'] = cookie;
// }
function setHeaders( token ){
  return axiosApi.defaults.headers['jwt'] = localStorage.getItem('token') || sessionStorage.getItem('token');
}

module.exports = {
  axiosApi,
  setHeaders
}
