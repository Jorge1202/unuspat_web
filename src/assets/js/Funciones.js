const Funciones = {
  // PETICIÓN GET
  addLocationStorage_login(data) {
    localStorage.setItem("idAuth", data.body.idAuth);
    localStorage.setItem("_iu", JSON.stringify(data.body.user));
    localStorage.setItem("_T_U", data.body.user.idTipoUsuario);
    localStorage.setItem(data.body.idAuth, data.body.session_token);
  },

  async deleteSession() {
    localStorage.removeItem(localStorage.getItem("idAuth")); // token
    localStorage.removeItem("_T_U"); //tipo de usuario
    localStorage.removeItem("_iu"); // usuario
    localStorage.removeItem("idAuth"); // autenticatio
  },
};

export default Funciones;
