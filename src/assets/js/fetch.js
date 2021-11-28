const URL = 'http://localhost:3001/';// DESARROLLO 

class Fetch {
  // PETICIÓN GET
  async GET(obj) {
    return await _AJAX(obj.url, 'GET');
  }

  // PETICIÓN POST
  async POST(obj) {
    return await _AJAX(obj.url, 'POST', obj.obj, obj.login);
  }

  // PETICIÓN PUT
  async PUT(obj) {
    return await _AJAX(obj.url, 'PUT', obj.obj, obj.login);
  }

  // PETICIÓN DELETE
  async DELETE(obj) {
    return await _AJAX(obj.url, 'DELETE', obj.obj);
  }

  //################################################################## AJAX

  //---------------------------------------------------
}
export default Fetch;

async function _AJAX(url, type, parameters = null, login = false, async = true) {
  debugger
  let token = '';
  if (login) {
    if (localStorage.dispositivo) token = `Bearer ${localStorage.dispositivo}`;
  } else {
    token = `Bearer ${localStorage.login}`;
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
  console.log(result)
  return result;
}
