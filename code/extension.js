class EvaluadorRetos {
    getInfo() {
      return {
        id: 'evaluadorRetos',
        name: 'Evaluador de Retos',
        blocks: [
          {
            opcode: 'validarReto',
            blockType: Scratch.BlockType.COMMAND,
            text: 'validar reto [RETO] en [URL]',
            arguments: {
              RETO: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'reto_frutas'
              },
              URL: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'https://tu-apps-script-url'
              }
            }
          }
        ]
      };
    }
  
    async validarReto(args) {
      const reto = args.RETO;
      const url = args.URL;
  
      try {
        const proyectoJSON = window.vm.toJSON();
  
        // VALIDACIÓN BÁSICA: siempre devuelve true por ahora
        const superado = true;
  
        const payload = {
          usuario: window.localStorage.getItem("usuario") || "anonimo",
          reto,
          superado,
          puntos: superado ? 100 : 0,
          timestamp: new Date().toISOString()
        };
  
        await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
  
        alert(`Reto "${reto}" validado. Resultado: ${superado ? '✅ Superado' : '❌ No superado'}`);
      } catch (e) {
        console.error('Error al validar el reto:', e);
        alert('❌ Error al validar el reto.');
      }
    }
  }
  
  Scratch.extensions.register(new EvaluadorRetos());
  