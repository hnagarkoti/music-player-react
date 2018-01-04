import config from '../config/index'
import API from '../Api/Api';
import $ from 'jquery';

// function setHeaders(token){
//   return API
// }

function handleUpdate(url, id, data){
  return API.axiosApi.put(url+id, {data})
  .then(function( res ){
    return res;
  })
  .catch(function(err){
    return err;
  })
}

function handleUpdateApi(url, id, data){
  return API.axiosApi.put(url+id, data)
  .then(function( res ){
    return res;
  })
  .catch(function(err){
    return err;
  })
}

function createNew(url, data){
  console.log('url:- ',url, 'data:- ', data);
  var obj = $.extend(true, {}, data);
  console.log('final obj = ', obj);
  return API.axiosApi.post(url, obj)
  .then(function( res ){
    return res;
  })
  .catch(function(err){
    return err;
  })
}
export default function handleLogin(url, data){

  return API.axiosApi.post(url, data)
  .then((res) => res)
  .catch((err) => err)
}

function deleteItem(url, id){
  return API.axiosApi.delete(url+'/'+id)
  .then((res) => res)
  .catch((err) => err)
}


// module.exports = {
//   handleUpdate,
//   createNew,
//   deleteItem,
//   handleUpdateApi
// }
