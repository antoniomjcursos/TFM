function gestionarSesion({ 
  idSaludo = "saludo", 
  idContenido = "contenido", 
  idModal = "modalSesion",
  urlLogin = "https://sites.google.com/view/programacion-eso/login" 
} = {}) {
  const usuario = sessionStorage.getItem("usuario");
  const saludo = document.getElementById(idSaludo);
  const contenido = document.getElementById(idContenido);
  const modal = document.getElementById(idModal);

  if (usuario) {
    if (saludo) saludo.innerText = "Bienvenido, " + usuario;
    if (contenido) contenido.style.display = "block";
    if (modal) modal.style.display = "none";
  } else {
    if (contenido) contenido.style.display = "none";
    if (modal) modal.style.display = "flex";
  }
}

function cerrarSesion({ 
  idSaludo = "saludo", 
  idContenido = "contenido", 
  idModal = "modalSesion",
  urlLogin = "https://sites.google.com/view/programacion-eso/login" 
} = {}) {
  sessionStorage.clear();
  const saludo = document.getElementById(idSaludo);
  const contenido = document.getElementById(idContenido);
  const modal = document.getElementById(idModal);

  if (saludo) saludo.innerText = "Sesión cerrada.";
  if (contenido) contenido.style.display = "none";
  if (modal) modal.style.display = "flex";
}
