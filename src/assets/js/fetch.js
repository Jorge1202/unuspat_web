import Funciones from "./Funciones";

const URL = location.host.includes("local")
  ? "http://localhost:3002/"
  : "http://192.168.1.70:3002/"; // DESARROLLO
// const URL = "https://sandbox-unuspat.azurewebsites.net/"; // sandbox
// const URL = "https://app-unuspat.azurewebsites.net/"; // produccion

const Fetch = {
  // PETICIÓN GET
  async GET(obj) {
    return await _FETCH(obj.url, "GET");
  },

  // PETICIÓN POST
  async POST(obj) {
    return await _FETCH(obj.url, "POST", obj.obj);
  },

  // PETICIÓN PUT
  async PUT(obj) {
    return await _FETCH(obj.url, "PUT", obj.obj);
  },

  // PETICIÓN DELETE
  async DELETE(obj) {
    return await _FETCH(obj.url, "DELETE", obj.obj);
  },
};

export default Fetch;

async function _FETCH(url, type, parameters = null, async = true) {
  let token = "";
  //validar si
  if (localStorage.getItem(localStorage.getItem("idAuth"))) {
    let _token = localStorage.getItem(localStorage.getItem("idAuth"));
    token = _token ? `Bearer ${_token}` : "";
  } else {
    let _token = localStorage.getItem("navegador");
    token = _token ? `Bearer ${_token}` : "";
  }

  let opcions = {
    async: async,
    crossDomain: true,
    method: type,
    headers: {
      authorization: token,
      "Content-Type": "application/json;charset=utf-8",
    },
  };

  if (type !== "GET") {
    if (parameters) opcions.body = JSON.stringify(parameters);
  }

  if (!localStorage.getItem("idAuth") && !url.includes("login")) {
    //no existe idAuth y la url es diferente de login
    Funciones.deleteSession();
    location.href = `${location.origin}/#/login`;
  } else {
    let response = await fetch(URL + url, opcions);

    let result = await response.json();

    if (result.status == 419 && result.error) {
      Funciones.deleteSession();
      location.href = `${location.origin}/#/login`;
    } else {
      if (!response.ok) {
        //valida algun error
        console.log(JSON.stringify(response));
      }
      return result;
    }
  }
}

/** 
 * Chrome
 * ".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"
    Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36,

  *OPERA
    "Chromium";v="102", "Opera";v="88", ";Not A Brand";v="99"
    Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.115 Safari/537.36 OPR/88.0.4412.74

  * EDGE
     " Not;A Brand";v="99", "Microsoft Edge";v="103", "Chromium";v="103"
      Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.114 Safari/537.36 Edg/103.0.1264.49

  * prueba responsive
    'user-agent': 'Mozilla/5.0 (Linux; Android 8.0; Pixel 2 Build/OPD3.170816.012) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.122 Mobile Safari/537.36',
  
  * celular
    'user-agent': 'Mozilla/5.0 (Linux; Android 11; motorola one fusion+ Build/RPIS31.Q2-42-25-1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Mobile Safari/537.36 OPT/2.9',
 */
