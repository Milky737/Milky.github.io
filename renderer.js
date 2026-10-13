const preguntas = [
{
    pregunta: "¿Cual es tu color favorito?",
    opciones: ["Azul", "Rojo", "Rosa", "No lo pusiste"],
},
{
    pregunta: "¿Brightheart or Cinderpelt?",
    opciones: ["Brightheart", "Cinderpelt"],
    correcta: null,
    reacciones: [
        {
            imagen: "brightheart.png",
            sonido: "brightheart.mp3",
            titulo: "👀",
            texto: "👀"
        },
        {
            imagen: "cinderpelt.png",
            sonido: "cinderpelt.mp3",
            titulo: "CINDERPEEEEELT",
            texto: "CINDERPEEEEEELT"
        }
    ]
},
{
    pregunta: "¿Cual es la comida favorita de milky?",
    opciones: ["Pizza", "Tacos", "Sushi", "Paella"],
    correcta: 1
},
{
    pregunta: "¿Quien es tu favorito?",
    opciones: ["Javi", "Milky", "Coco", "Caine"],
    correcta: null,
    tipo: "milky"
},
{
    pregunta: "¿Que opinas de este quiz? ¿Te gusta?",
    opciones: ["Me encanta", "Es bellisimo", "Te lo digo en wasap"],
    correcta: 0
},
{
    pregunta:  "De toda la trayectoria de WC a quien revives?",
    opciones: ["Jaspeada", "Estrella Azul", "Que original"],
    correcta: 0
},
{
    pregunta: "¿Plataformas o Proyectiles?",
    opciones: ["Plataformas", "Proyectiles", "Ninguna"],
    correcta: null,
    tipo: "minijuego" 
},
{
    pregunta: "Reto de memoria 👀",
    opciones: ["Ver la imagen y memorizarla"],
    correcta: null,
    tipo: "memoria"
},
{
  pregunta: "Me eh.. quedado sin ideas para mas preguntas asi que ¿Cual es la capital de Francia...?",
  opciones: ["Paris", "Pontevedra", "CDMX", "Dubai"],
  correcta: 1
},
{
  pregunta: "Aqui va una: En adopt me hay una mascota exclusiva cual es?",
  opciones: ["Shadow Dragon", "Libelula", "Perro"],
  correcta: 1
},
{
  pregunta: "En Warrior Cats hay un personaje que parece importante pero no lo es ¿Quien es?",
  opciones: ["Sol", "Corazon de leon", "Pelusa"],
  correcta: 1
},
{
  pregunta: "No se me ocurre una pregunta bueno solo esta para joder ¿Me odias?",
  opciones: ["Si", "Si", "Si", "Omitir"],
  correcta: 0
},
{
 pregunta: "¿Cuantos años cumplire en 3 meses?",
 opciones: ["17", "18", "19",],
 correcta: 1
},
{
  pregunta: "Te han gustado estas preguntas de relleno?",
  opciones: ["Un poco", "Si", "No tienes ideas"],
  correcta: 0
},
{
  pregunta:"Lista para las ultimas preguntas de relleno que hice",
  opciones: ["Espero no sea nada malo", "Si es algo malo te doy un pñetazo"],
  correcta: 0
},
{
    pregunta: "¿Me odiaras cuando llegues a la ultima pregunta?",
    opciones: ["No lo se", "Nooo", "Si es algo malo si"],
    correcta: 0
},
{
    pregunta: "¿Te incomoda el quiz? si te incomoda puedes presionar ALT+F4",
    opciones: ["Noo quiero seguir", "Si me incomoda"],
    correcta: 0
},
{
    pregunta: "Pregunta extraña ¿Si fueramos algo mas que amigos que limites pondrias?",
    opciones: ["Basta", "No lo se", "Como jodes"],
    correcta: 0
},
{
    pregunta: "Espero hayas llegado hasta aqui... pero ¿Lista para la ultima pregunta?",
    opciones: ["Nerviosa", "No", "Si, ya se que es", "si"],
    correcta: 0
},
{
    pregunta: "¿Quieres ser mi pareja...?",
    opciones: ["Siii", "Ocupo mas tiempo", "No", "Asco"],
    correcta: 0,
    tipo: "final"
}];
 
let indice = 0;
let puntos = 0;

function iniciarQuiz() {
  const musica = document.getElementById("musica");

  musica.play().catch(() => {
    console.log("No se pudo iniciar la música.");
  });

  mostrarPregunta();
}

function mostrarPregunta() {
  const preguntaActual = preguntas[indice];

  document.getElementById("pantalla").innerHTML = `
    <h1>Pregunta ${indice + 1} de ${preguntas.length}</h1>
    <p>${preguntaActual.pregunta}</p>

    <div id="opciones">
      ${preguntaActual.opciones.map((opcion, i) =>
        `<button class="opcion-respuesta" data-indice="${i}">${opcion}</button>`
      ).join("")}
    </div>
  `;
}

function responder(elegida) {
  const preguntaActual = preguntas[indice];

  if (preguntaActual.tipo === "memoria") {
    iniciarRetoMemoria();
    return;
  }

  if (preguntaActual.tipo === "minijuego") {
    let juegoElegido = elegida;

    if (elegida === 2) {
      juegoElegido = Math.floor(Math.random() * 2);
    }

    if (juegoElegido === 0) {
      iniciarPlataformas();
    } else {
      iniciarProyectiles();
    }

    return;
  }




  if (preguntaActual.tipo === "final") {
    if (elegida === 0) {
        mostrarFinal();
    } else {
        transicionAFinalTriste();
    }
     return;

  }

  if (preguntaActual.tipo === "milky") {
    const posicionMilky = preguntaActual.opciones.findIndex(opcion =>
      opcion.includes("Milky")
    );

    if (elegida === posicionMilky) {
      const sonido = new Audio("milky.mp3");
      sonido.play().catch(() => {});

      document.getElementById("pantalla").innerHTML = `
        <h1>¡La respuesta correcta era Milky!</h1>
        <img class="imagen-reaccion" src="milky.png" alt="Milky">
        <p>No había otra respuesta posible.</p>
        <button data-accion="continuar">Continuar ✨</button>
      `;
      return;
    }

    const opcionElegida = preguntaActual.opciones[elegida];
    preguntaActual.opciones[elegida] = preguntaActual.opciones[posicionMilky];
    preguntaActual.opciones[posicionMilky] = opcionElegida;

    mostrarPregunta();
    return;
  }

  if (preguntaActual.reacciones) {
    mostrarReaccion(preguntaActual.reacciones[elegida]);
    return;
  }

  if (preguntaActual.correcta === elegida) {
    puntos++;
  }

  siguientePregunta();
}

function mostrarReaccion(reaccion) {
  const efecto = new Audio(reaccion.sonido);
  efecto.volume = 0.7;
  efecto.play().catch(() => {});

  document.getElementById("pantalla").innerHTML = `
    <h1>${reaccion.titulo}</h1>
    <img class="imagen-reaccion" src="${reaccion.imagen}" alt="${reaccion.titulo}">
    <p>${reaccion.texto}</p>
    <button data-accion="continuar">Continuar 💖</button>
  `;
}

let respuestaMemoria = null;

function iniciarRetoMemoria() {
  document.getElementById("pantalla").innerHTML = `
    <h1>Reto de memoria 👀</h1>
    <p>Observa muy bien la imagen. Cuando estés lista, continúa.</p>
    <img class="imagen-memoria" src="memoria-gorro.jpg" alt="Imagen para memorizar">
    <button data-accion="memoria-lista">Ya la memoricé</button>
  `;
}

function preguntarColorGorro() {
  document.getElementById("pantalla").innerHTML = `
    <h1>Pregunta de memoria</h1>
    <p>¿De qué color era la punta izquierda del gorro?</p>
    <div id="opciones">
      <button class="respuesta-memoria" data-respuesta="0">Roja</button>
      <button class="respuesta-memoria" data-respuesta="1">Azul</button>
      <button class="respuesta-memoria" data-respuesta="2">Amarilla</button>
    </div>
  `;
}

function confirmarMemoria() {
  document.getElementById("pantalla").innerHTML = `
    <h1>¿Estás segura? 🤨</h1>
    <p>Puedes confirmar tu respuesta o ver la imagen una vez más.</p>
    <button data-accion="memoria-segura">Sí, estoy segura</button>
    <button data-accion="memoria-revisar">Ver la imagen de nuevo 👀</button>
  `;
}

function crearImagenGorroInvertido() {
  return new Promise((resolver, rechazar) => {
    const imagen = new Image();
    const fs = require("fs");
    const path = require("path");

    imagen.onload = () => {
      const lienzo = document.createElement("canvas");
      lienzo.width = imagen.width;
      lienzo.height = imagen.height;
      const contexto = lienzo.getContext("2d");
      contexto.drawImage(imagen, 0, 0);

      const datos = contexto.getImageData(0, 0, lienzo.width, lienzo.height);
      const pixeles = datos.data;

      for (let y = 0; y < lienzo.height; y++) {
        for (let x = 0; x < lienzo.width; x++) {
          // Solo se altera la zona del gorro, no la cara ni los ojos.
          const zonaGorro = y < 170 || ((x < 190 || x > 545) && y < 510);
          if (!zonaGorro) continue;

          const posicion = (y * lienzo.width + x) * 4;
          const rojo = pixeles[posicion];
          const verde = pixeles[posicion + 1];
          const azul = pixeles[posicion + 2];

          const esRojo = rojo > 120 && rojo > verde * 1.4 && rojo > azul * 1.2;
          const esAzul = azul > 120 && azul > rojo * 1.15 && azul > verde * 1.15;

          if (esRojo) {
            pixeles[posicion] = 84;
            pixeles[posicion + 1] = 121;
            pixeles[posicion + 2] = 215;
          } else if (esAzul) {
            pixeles[posicion] = 202;
            pixeles[posicion + 1] = 46;
            pixeles[posicion + 2] = 77;
          }
        }
      }

      contexto.putImageData(datos, 0, 0);
      resolver(lienzo.toDataURL("image/jpeg", 0.94));
    };

    imagen.onerror = rechazar;

    // Un Data URL evita que Electron marque el canvas como cross-origin.
    const archivo = fs.readFileSync(path.join(__dirname, "memoria-gorro.jpg"));
    imagen.src = `data:image/jpeg;base64,${archivo.toString("base64")}`;
  });
}

async function mostrarImagenTrampa() {
  const pantalla = document.getElementById("pantalla");
  pantalla.innerHTML = `<h1>Revisando imagen…</h1>`;

  try {
    const imagenInvertida = await crearImagenGorroInvertido();
    pantalla.innerHTML = `
      <h1>¿Estás segura ahora? 👀</h1>
      <p>Observa con cuidado.</p>
      <img class="imagen-memoria" src="${imagenInvertida}" alt="Imagen revisada">
      <button data-accion="memoria-segura">Sí, ahora sí</button>
    `;
  } catch {
    finalizarRetoMemoria();
  }
}

function finalizarRetoMemoria() {
  const acerto = respuestaMemoria === 0;
  document.getElementById("pantalla").innerHTML = `
    <h1>${acerto ? "¡Lo recordaste! 🎉" : "Esa imagen te confundió 😈"}</h1>
    <p>En la imagen original, la punta izquierda del gorro era <strong>roja</strong>.</p>
    <button data-accion="continuar">Continuar ✨</button>
  `;
}

function siguientePregunta() {
  indice++;

  if (indice < preguntas.length) {
    mostrarPregunta();
  } else {
    mostrarFinal();
  }
}

function mostrarFinal() {
  document.getElementById("pantalla").innerHTML = `
    <h1>💖 Para ti 💖</h1>
    <p>
      Llegaste hasta el final… y eso significa mucho para mí.<br><br>
      Me haces feliz y quiero seguir creando recuerdos a tu lado.<br><br>
      <strong>Te quiero muchísimo.</strong>
    </p>
    <button data-accion="reiniciar">Repetir quiz</button>
  `;
}

function cambiarMusica(musicatriste) {
    const musicaFondo = document.getElementById("musica");

    musicaFondo.pause();
    musicaFondo.currentTime = 0;

    const nuevaMusica = new Audio(musicatriste);
    nuevaMusica.loop = true;
    nuevaMusica.volume = 0.55;
    nuevaMusica.play().catch(() => {});
}

function transicionAFinalTriste() {
  const pantalla = document.getElementById("pantalla");

  pantalla.classList.add("transicion-triste");

  setTimeout(() => {
    mostrarFinalTriste();
  }, 750);
}

function mostrarFinalTriste() {
  cambiarMusica("musicatriste.mp3");

  document.body.classList.add("modo-triste");

  const pantalla = document.getElementById("pantalla");

  pantalla.classList.remove("transicion-triste");
  pantalla.classList.add("entrada-triste");

  pantalla.innerHTML =
  document.getElementById("pantalla").innerHTML = `
    <h1>...</h1>
    <p>
      Entiendo.<br><br>
      Lo siento por hacer esta tonteria, pero gracias por llegar hasta aquí.<br>
      Aun así, Lamento hacer esto se que necesitas tiempo pero pero bueno lo siento,
       perdon :(.
    </p>

    <img class="gatito-triste" src="gatitotriste.png" alt="Gatito triste">

    <div>
      <button data-accion="reiniciar">Repetir quiz</button>
      <button data-accion="cerrar">Cerrar quiz</button>
    </div>
  `;
}

let idAnimacion = null;
let juegoActivo = false;
let saltoPedido = false;
const teclas = {};

document.addEventListener("keydown", (evento) => {
  if (!juegoActivo) return;

  if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "KeyB"].includes(evento.code)) {
    evento.preventDefault();
    teclas[evento.code] = true;

    if (evento.code === "KeyB" && !evento.repeat) {
      saltoPedido = true;
    }
  }
});

document.addEventListener("keyup", (evento) => {
  teclas[evento.code] = false;
});

function detenerMinijuego() {
  juegoActivo = false;

  if (idAnimacion) {
    cancelAnimationFrame(idAnimacion);
    idAnimacion = null;
  }
}

function terminarMinijuego(titulo, texto) {
  detenerMinijuego();

  document.getElementById("pantalla").innerHTML = `
    <h1>${titulo}</h1>
    <p>${texto}</p>
    <button data-accion="continuar">Continuar 💖</button>
  `;
}

function iniciarPlataformas() {
  detenerMinijuego();
  juegoActivo = true;

  document.getElementById("pantalla").innerHTML = `
    <h1>Mini parkour</h1>
    <p>Usa ← y → para moverte. Pulsa <strong>B</strong> para saltar.</p>
    <canvas id="juego-canvas" width="620" height="360"></canvas>
  `;

  const canvas = document.getElementById("juego-canvas");
  const ctx = canvas.getContext("2d");

  const jugador = {
    x: 45,
    y: 280,
    ancho: 28,
    alto: 28,
    velocidadY: 0,
    enSuelo: false
  };

  const plataformas = [
    {x: 0, y: 320, ancho: 195, alto: 40},
    {x: 240, y: 265, ancho: 120, alto: 15},
    {x: 400, y: 205, ancho: 110, alto: 15},
    {x: 540, y: 145, ancho: 80, alto: 15}
  ];

  function reiniciarJugador() {
    jugador.x = 45;
    jugador.y = 280;
    jugador.velocidadY = 0;
  }

  function dibujar() {
    ctx.fillStyle = "#10121d";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#49e870";
    plataformas.forEach((plataforma) => {
      ctx.fillRect(
        plataforma.x,
        plataforma.y,
        plataforma.ancho,
        plataforma.alto
      );
    }
  );

   ctx.font = "35px Arial";
   ctx.fillText("🏁", 570, 115);

   ctx.fillStyle = "#ffffff";
   ctx.font = "28px Arial";
   ctx.fillText("O", jugador.x, jugador.y + 24);
  }

  function actualizar() {
    if (!juegoActivo) return;

    const posicionYAnterior = jugador.y;

    if (teclas.ArrowLeft) jugador.x -= 4;
    if (teclas.ArrowRight) jugador.x += 4;
  
    jugador.x = Math.max(0, Math.min(canvas.width - jugador.ancho, jugador.x));

    jugador.velocidadY += 0.55;
    jugador.y += jugador.velocidadY;
    jugador.enSuelo = false;

    plataformas.forEach((plataforma) => {
        const tocaHorizontalmente =
    jugador.x + jugador.ancho > plataforma.x &&
    jugador.x < plataforma.x + plataforma.ancho;

  const cayoEncima =
    jugador.velocidadY >= 0 &&
    posicionYAnterior + jugador.alto <= plataforma.y &&
    jugador.y + jugador.alto >= plataforma.y;

  if (tocaHorizontalmente && cayoEncima) {
    jugador.y = plataforma.y - jugador.alto;
    jugador.velocidadY = 0;
    jugador.enSuelo = true;
  }
});

  if (saltoPedido && jugador.enSuelo) {
  jugador.velocidadY = -11;
}

saltoPedido = false;

if (jugador.y > canvas.height + 40) {
  reiniciarJugador();
}

if (jugador.x > 565 && jugador.y < 145) {
  terminarMinijuego("¡TERMINASTE EL PARKOUR!", "¡Llegaste a la meta!");
  return;
}

dibujar();
idAnimacion = requestAnimationFrame(actualizar);
  }

actualizar();

}

function iniciarProyectiles() {
  detenerMinijuego();
  juegoActivo = true;

    document.getElementById("pantalla").innerHTML = `
    <h1>Bullet hell</h1>
    <p>Usa las flechas para sobrevivir durante 12 segundos.</p>
    <canvas id="juego-canvas" width="620" height="360"></canvas>
  `;

  const canvas = document.getElementById("juego-canvas");
  const ctx = canvas.getContext("2d");

  const jugador = {x: 300, y: 175, radio: 13};
  const proyectiles = [];
  let cuadros = 0;
  let tiempo = 12 * 60;

  function crearProyectil() {
    const lado = Math.floor(Math.random() * 4);
    let x;
    let y;

    if (lado === 0) { x = Math.random() * canvas.width; y = -15; }
    if (lado === 1) { x = canvas.width + 15; y = Math.random() * canvas.height; }
    if (lado === 2) { x = Math.random() * canvas.width; y = canvas.height + 15; }
    if (lado === 3) { x = -15; y = Math.random() * canvas.height; }

    const angulo = Math.atan2(jugador.y - y, jugador.x - x);
    const velocidad = 2.5 + Math.random() * 1.5;

    proyectiles.push({
      x, 
      y,
      velocidadX: Math.cos(angulo) * velocidad,
      velocidadY: Math.sin(angulo) * velocidad,
      radio: 7
    });
  }

  function dibujar() {
    ctx.fillStyle = "#0b0710";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#ff2d55";
    proyectiles.forEach((proyectil) => {
      ctx.beginPath();
      ctx.arc(proyectil.x, proyectil.y, proyectil.radio, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.fillStyle = "#ffffff";
    ctx.font = "28px Arial";
    ctx.fillText("O", jugador.x - 10, jugador.y + 10);

    ctx.fillStyle = "#ffffff";
    ctx.font = "18px Arial";
    ctx.fillText(`Sobrevive: ${Math.ceil(tiempo / 60)} s`, 20, 30);
  }

  function actualizar() {
    if (!juegoActivo) return;

    cuadros++;
    tiempo--;

    if (teclas.ArrowLeft) jugador.x -= 4;
    if (teclas.ArrowRight) jugador.x += 4;
    if (teclas.ArrowUp) jugador.y -= 4;
    if (teclas.ArrowDown) jugador.y += 4;

    jugador.x = Math.max(jugador.radio, Math.min(canvas.width - jugador.radio, jugador.x));
    jugador.y = Math.max(jugador.radio, Math.min(canvas.height - jugador.radio, jugador.y));

    const frecuencia = tiempo < 360 ? 12 : 20;

    if (cuadros % frecuencia === 0) {
      crearProyectil();
    }

    for (const proyectil of proyectiles) {
      proyectil.x += proyectil.velocidadX;
      proyectil.y += proyectil.velocidadY;

      const distancia = Math.hypot(
        jugador.x - proyectil.x,
        jugador.y - proyectil.y
      );

      if (distancia < jugador.radio + proyectil.radio) {
        detenerMinijuego();

        document.getElementById("pantalla").innerHTML = `
          <h1>¡Te alcanzaron!</h1>
          <p>Ese bullet hell sí era difícil.</p>
          <button data-accion="reintentar-proyectiles">Intentar otra vez</button>
          <button data-accion="continuar">Continuar de todos modos</button>
        `;
        return;
      }
    }

    if (tiempo <= 0) {
      terminarMinijuego(
        "¡Sobreviviste! 🔴",
        "Esquivaste todos los proyectiles."
      );
      return;
    }

    dibujar();
    idAnimacion = requestAnimationFrame(actualizar);
  }

  actualizar();
}

document.addEventListener("click", (evento) => {
  const boton = evento.target.closest("button");

  if (!boton) return;

  if (boton.id === "boton-comenzar") {
    iniciarQuiz();
    return;
  }

  if (boton.classList.contains("opcion-respuesta")) {
    responder(Number(boton.dataset.indice));
    return;
  }

  if (boton.classList.contains("respuesta-memoria")) {
    respuestaMemoria = Number(boton.dataset.respuesta);
    confirmarMemoria();
    return;
  }

  if (boton.dataset.accion === "memoria-lista") {
    preguntarColorGorro();
    return;
  }

  if (boton.dataset.accion === "memoria-revisar") {
    mostrarImagenTrampa();
    return;
  }

  if (boton.dataset.accion === "memoria-segura") {
    finalizarRetoMemoria();
    return;
  }

  if (boton.dataset.accion === "continuar") {
    siguientePregunta();
    return;
  }

  if (boton.dataset.accion === "reiniciar") {
    location.reload();
    return;
  }

  if (boton.dataset.accion === "cerrar") {
    window.close();
    return;
  }

  if (boton.dataset.accion === "reintentar-proyectiles") {
    iniciarProyectiles();
  }

});
