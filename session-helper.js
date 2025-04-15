function gestionarSesion({ 
  idSaludo = "saludo", 
  idContenido = "contenido", 
  urlLogin = "https://sites.google.com/view/programacion-eso/login" 
} = {}) {
  const usuario = sessionStorage.getItem("usuario");
  const saludo = document.getElementById(idSaludo);
  const contenido = document.getElementById(idContenido);

  if (usuario) {
    saludo.innerText = "Bienvenido, " + usuario;
    if (contenido) contenido.style.display = "block";
  } else {
    saludo.innerHTML = `
      No hay sesión activa.<br>
      <a href="${urlLogin}" target="_top" style="font-weight:bold; color:green;">
        👉 Iniciar sesión
      </a>
    `;
    if (contenido) contenido.style.display = "none";
  }
}

function cerrarSesion({ 
  idSaludo = "saludo", 
  idContenido = "contenido", 
  urlLogin = "https://sites.google.com/view/programacion-eso/login" 
} = {}) {
  sessionStorage.clear();
  const saludo = document.getElementById(idSaludo);
  const contenido = document.getElementById(idContenido);

  saludo.innerHTML = `
    Sesión cerrada.<br>
    <a href="${urlLogin}" target="_top" style="font-weight:bold; color:green;">
      👉 Iniciar sesión nuevamente
    </a>
  `;
  if (contenido) contenido.style.display = "none";
}
