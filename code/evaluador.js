
window.retosEvaluables = {
  'reto_manzanas': {
    'titulo': '🍎 Reto: Atrapar Manzanas',
    'instrucciones': 'El jugador debe atrapar manzanas para ganar puntos y evitar rayos que restan vidas. El juego termina cuando se acaban las vidas.',
    'ayuda': 'https://www.picuino.com/es/scratch3-atrapar-manzanas.html',
    'demo': 'atrapar manzanas.html',
    'criterios': [
      ['event_whenflagclicked', 'El juego comienza al presionar la bandera verde', 'imagenes/event_whenflagclicked.png'],
      ['motion_turnright', 'El personaje gira a la derecha al pulsar la flecha derecha', 'imagenes/motion_turnright.png'],
      ['motion_turnleft', 'El personaje gira a la izquierda al pulsar la flecha izquierda', 'imagenes/motion_turnleft.png'],
      ['data_variable', 'Se han creado variables "Vidas" y "Puntos"', 'imagenes/data_variable.png'],
      ['data_setvariableto', 'Se inicializan las variables al comenzar el juego', 'imagenes/data_setvariableto.png'],
      ['control_create_clone_of', 'Se crean clones de manzanas y rayos', 'imagenes/control_create_clone_of.png'],
      ['motion_changeyby', 'Las manzanas y rayos caen hacia abajo', 'imagenes/motion_changeyby.png'],
      ['sensing_touchingobject', 'Detecta colisión entre manzana y gato o rayo y gato', 'imagenes/sensing_touchingobject.png'],
      ['data_changevariableby', 'Se modifican variables al recoger manzanas o tocar rayos', 'imagenes/data_changevariableby.png'],
      ['control_if', 'Condicionales para verificar colisiones y terminar el juego', 'imagenes/control_if.png']
    ]
  },
'reto_marcianos': {
  'titulo': '👾 Reto: Matar Marcianitos',
  'instrucciones': 'El jugador debe disparar a los enemigos y evitar ser alcanzado. El juego termina si pierde todas las vidas.',
  'ayuda': 'https://www.picuino.com/es/scratch3-matar-marcianitos.html',
  'demo': 'marcianos.html',
  'criterios': [
    ['event_whenflagclicked', 'El juego comienza al presionar la bandera verde', 'imagenes/event_whenflagclicked.png'],
    ['event_whenkeypressed', 'Se detecta la pulsación de una tecla para disparar o moverse', 'imagenes/event_whenkeypressed.png'],
    ['motion_changexby', 'El personaje puede moverse lateralmente', 'imagenes/motion_changexby.png'],
    ['motion_setx', 'Se establece la posición inicial en el eje X', 'imagenes/motion_setx.png'],
    ['control_create_clone_of', 'Se crean clones para los disparos o enemigos', 'imagenes/control_create_clone_of.png'],
    ['control_start_as_clone', 'Se define el comportamiento de los clones', 'imagenes/control_start_as_clone.png'],
    ['motion_changeyby', 'Los disparos o enemigos se mueven en el eje Y', 'imagenes/motion_changeyby.png'],
    ['sensing_touchingobject', 'Se detectan colisiones entre disparos y enemigos', 'imagenes/sensing_touchingobject.png'],
    ['data_changevariableby', 'Se incrementa la puntuación o se reducen vidas', 'imagenes/data_changevariableby.png'],
    ['control_if', 'Se usan condicionales para gestionar impactos o fin de juego', 'imagenes/control_if.png']
  ]
}

};

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
          "🔴 Sigue practicando. ¡Tú puedes!",
    ayuda: reto.ayuda,
    demo: reto.demo
  };
};
