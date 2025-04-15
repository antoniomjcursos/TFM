function gestionarSesion({
  idSaludo = "saludo",
  idContenido = "contenido",
  idModal = "modalSesion",
  urlLogin = "login.html"
} = {}) {
  const usuario = sessionStorage.getItem("usuario");
  const saludo = idSaludo ? document.getElementById(idSaludo) : null;
  const contenido = idContenido ? document.getElementById(idContenido) : null;
  const modal = idModal ? document.getElementById(idModal) : null;

  if (usuario) {
    if (saludo) saludo.textContent = "Bienvenido, " + usuario;
    if (contenido) contenido.style.display = "block";
    if (modal) modal.style.display = "none";
  } else {
    if (contenido) contenido.style.display = "none";
    if (modal) modal.style.display = "flex";
  }
}

function cerrarSesion() {
  sessionStorage.clear();
  location.href = "login.html";
}
