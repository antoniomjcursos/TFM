window.retosEvaluables = { 'reto_frutas': { 'titulo': '🍎 Reto: Recoger Frutas', 'instrucciones': 'Crea un juego donde un personaje se mueva y recoja frutas aumentando el marcador.', 'criterios': [['motion_movesteps', 'Movimiento del personaje', 'img/motion_movesteps.svg'], ['sensing_touchingobject', 'Detecta colisión con la fruta', 'img/sensing_touchingobject.svg'], ['data_variable', "Variable 'marcador' creada", 'img/data_variable.svg'], ['data_changevariableby', 'Incrementa marcador al recoger fruta', 'img/data_changevariableby.svg'], ['looks_show', 'Muestra la fruta al inicio', 'img/looks_show.svg'], ['looks_hide', 'Oculta la fruta al recogerla', 'img/looks_hide.svg'], ['sound_play', 'Reproduce sonido al recoger', 'img/sound_play.svg'], ['control_repeat', 'Usa bucles para repetir el reto', 'img/control_repeat.svg'], ['motion_goto', 'La fruta aparece en posición aleatoria', 'img/motion_goto.svg'], ['control_if', 'Usa condicional para verificar colisión', 'img/control_if.svg']] }, 'reto_laberinto': { 'titulo': '🧩 Reto: Escape del Laberinto', 'instrucciones': 'Haz que el personaje se mueva por el laberinto, evitando muros hasta llegar a la meta.', 'criterios': [['event_whenkeypressed', 'Movimiento con teclas', 'img/event_whenkeypressed.svg'], ['motion_changexby', 'Cambio en X', 'img/motion_changexby.svg'], ['motion_changeyby', 'Cambio en Y', 'img/motion_changeyby.svg'], ['sensing_touchingobject', 'Colisión con muros', 'img/sensing_touchingobject.svg'], ['control_if', 'Condicional al tocar muro', 'img/control_if.svg'], ['motion_goto', 'Empieza desde un punto fijo', 'img/motion_goto.svg'], ['data_variable', 'Variable de vidas', 'img/data_variable.svg'], ['data_changevariableby', 'Disminuye vidas al tocar muro', 'img/data_changevariableby.svg'], ['looks_say', 'Mensaje al llegar a la meta', 'img/looks_say.svg'], ['looks_switchbackdropto', 'Cambio de fondo al ganar', 'img/looks_switchbackdropto.svg']] }, 'reto_saludos': { 'titulo': '👋 Reto: Interacción con Personaje', 'instrucciones': 'Crea un personaje que salude y reaccione al ser tocado o al presionar una tecla.', 'criterios': [['looks_say', 'Dice un saludo', 'img/looks_say.svg'], ['sound_play', 'Reproduce sonido al hablar', 'img/sound_play.svg'], ['sensing_touchingobject', 'Detecta si lo tocan', 'img/sensing_touchingobject.svg'], ['control_if', 'Reacciona con condicional', 'img/control_if.svg'], ['event_whenkeypressed', 'Reacciona con una tecla', 'img/event_whenkeypressed.svg'], ['looks_think', 'Muestra pensamiento', 'img/looks_think.svg'], ['control_wait', 'Espera entre acciones', 'img/control_wait.svg'], ['motion_glideto', 'Se desliza al hablar', 'img/motion_glideto.svg'], ['looks_changeeffectby', 'Cambia efecto visual', 'img/looks_changeeffectby.svg'], ['looks_cleargraphiceffects', 'Restaura efectos', 'img/looks_cleargraphiceffects.svg']] }, 'reto_puntos': { 'titulo': '🎯 Reto: Juego de Puntos', 'instrucciones': 'Haz que el jugador recoja objetos que aumentan puntos y evite los que los restan.', 'criterios': [['sensing_touchingobject', 'Detecta objeto bueno', 'img/sensing_touchingobject.svg'], ['data_variable', 'Variable de puntos', 'img/data_variable.svg'], ['data_changevariableby', 'Suma puntos', 'img/data_changevariableby.svg'], ['control_if', 'Verifica colisión buena', 'img/control_if.svg'], ['control_if_else', 'Distingue objetos buenos y malos', 'img/control_if_else.svg'], ['looks_say', 'Mensaje por ganar o perder', 'img/looks_say.svg'], ['looks_hide', 'Oculta objeto al recogerlo', 'img/looks_hide.svg'], ['motion_goto', 'Objeto cambia posición', 'img/motion_goto.svg'], ['sound_play', 'Sonido por puntos', 'img/sound_play.svg'], ['data_setvariableto', 'Reinicia puntos', 'img/data_setvariableto.svg']] }, 'reto_animado': { 'titulo': '🎞 Reto: Animación Interactiva', 'instrucciones': 'Haz una escena animada con personajes que se muevan, hablen y cambien disfraces.', 'criterios': [['looks_nextcostume', 'Cambia disfraz', 'img/looks_nextcostume.svg'], ['control_repeat', 'Repite animación', 'img/control_repeat.svg'], ['control_wait', 'Pausa entre acciones', 'img/control_wait.svg'], ['motion_movesteps', 'Movimiento del personaje', 'img/motion_movesteps.svg'], ['looks_say', 'Habla al moverse', 'img/looks_say.svg'], ['sound_play', 'Reproduce sonido', 'img/sound_play.svg'], ['looks_switchcostumeto', 'Selecciona disfraz específico', 'img/looks_switchcostumeto.svg'], ['control_if', 'Condicional para interacción', 'img/control_if.svg'], ['looks_changeeffectby', 'Cambia efecto gráfico', 'img/looks_changeeffectby.svg'], ['looks_cleargraphiceffects', 'Limpia efectos', 'img/looks_cleargraphiceffects.svg']] } };


window.evaluarReto = function (json, retoId) {
  const reto = window.retosEvaluables[retoId];
  if (!reto) {
    return { error: "❌ Reto no encontrado: " + retoId };
  }

  const bloques = new Set();
  const variables = new Set();

  json.targets.forEach(t => {
    Object.values(t.blocks || {}).forEach(b => b?.opcode && bloques.add(b.opcode));
    Object.values(t.variables || {}).forEach(v => variables.add(v[0]));
  });

  const rubrica = [];
  let puntuacion = 0;

  for (let [clave, descripcion, imagen] of reto.criterios) {
    const cumple = clave.startsWith("data_")
      ? [...variables].some(v => v.toLowerCase().includes("marcador") || v.toLowerCase().includes("vidas") || v.toLowerCase().includes("puntos"))
      : bloques.has(clave);
    rubrica.push({ criterio: descripcion, resultado: cumple ? "✅" : "❌" });
    if (cumple) puntuacion += 10;
  }

  return {
    titulo: reto.titulo,
    instrucciones: reto.instrucciones,
    rubrica,
    puntuacion,
    mensaje:
      puntuacion === 100 ? "🎉 ¡Reto superado!" :
        puntuacion >= 60 ? "🟡 Buen intento, puedes mejorar." :
          "🔴 Sigue practicando. ¡Tú puedes!"
  };
};
