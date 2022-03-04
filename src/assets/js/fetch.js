const URL = 'http://localhost:3002/';// DESARROLLO 

const Fetch = {
  // PETICIÓN GET
  async GET(obj) {
    return await _FETCH(obj.url, 'GET');
  },

  // PETICIÓN POST
  async POST(obj) {
    return await _FETCH(obj.url, 'POST', obj.obj, obj.login);
  },

  // PETICIÓN PUT
  async PUT(obj) {
    return await _FETCH(obj.url, 'PUT', obj.obj, obj.login);
  },

  // PETICIÓN DELETE
  async DELETE(obj) {
    return await _FETCH(obj.url, 'DELETE', obj.obj);
  }
}
export default Fetch;

async function _FETCH(url, type, parameters = null, login = false, async = true) {
  let token = '';


  if (!localStorage.getItem(localStorage.getItem('idAuth'))) {
    let _token = localStorage.getItem('dispositivo')
    token = _token ? `Bearer ${_token}` : '' ;
  } else {
    let _token = localStorage.getItem(localStorage.getItem('idAuth'))
    token = _token ? `Bearer ${_token}` : '';
  }

  let opcions = {
    async: async,
    crossDomain: true,
    method: type,
    headers: {
      "authorization": token,
      'Content-Type': 'application/json;charset=utf-8'
    }
  };
  
  if (type !== 'GET') {
    if (parameters) opcions.body = JSON.stringify(parameters)
  }
  let response = await fetch(
    URL + url,
    opcions
  );
  let result = await response.json();
  return result;
  // return  {body:'', error:false, code:200};
 
}
