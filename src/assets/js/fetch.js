const URL = 'http://localhost:3002/';// DESARROLLO 

const Fetch = {
  // PETICIÓN GET
  async GET(obj) {
    return await _AJAX(obj.url, 'GET');
  },

  // PETICIÓN POST
  async POST(obj) {
    return await _AJAX(obj.url, 'POST', obj.obj, obj.login);
  },

  // PETICIÓN PUT
  async PUT(obj) {
    return await _AJAX(obj.url, 'PUT', obj.obj, obj.login);
  },

  // PETICIÓN DELETE
  async DELETE(obj) {
    return await _AJAX(obj.url, 'DELETE', obj.obj);
  }
}
export default Fetch;

function ValidDispositivo() {
  let arrTemLogin = localStorage.getItem('dispositivos') ? JSON.parse(localStorage.getItem('dispositivos')) : [];
  let token = null;
  let found = arrTemLogin.find(x => x[`${localStorage.getItem('idAuth')}`]);
  if (found) { token = found[localStorage.getItem('idAuth')]} 
  
  return token ? `Bearer ${token}` : '' ;
}

async function _AJAX(url, type, parameters = null, login = false, async = true) {
  let token = '';

  if (localStorage.getItem(localStorage.getItem('idAuth'))) {
    let _token = localStorage.getItem(localStorage.getItem('idAuth'))
    token = _token ? `Bearer ${_token}` : '';
  } else {
    token = ValidDispositivo()
  }
  //let sesion = null;
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
}
