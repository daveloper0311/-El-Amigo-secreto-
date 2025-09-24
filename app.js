// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.
let listaAmigos = [];
let amigosSorteados = [];
let formatoNombreInicial = "";

function agregarAmigo() {
  let inputNombre = document.querySelector("#amigo");
  let nombreAmigo = inputNombre.value.trim();
  let nombreValidado = validarNombre(nombreAmigo);

  if (nombreValidado) {
    if (!listaAmigos.includes(nombreValidado)) {
      listaAmigos.push(nombreValidado);

      let listaAmigosUI = document.querySelector("#listaAmigos");
      let nuevoItem = document.createElement("li");
      nuevoItem.textContent = nombreValidado;
      listaAmigosUI.appendChild(nuevoItem);

      inputNombre.value = "";
    } else {
      alert("Ese amigo ya está en la lista.");
    }
  }
}

function validarNombre(nombre) {
  if (!nombre) {
    alert("Por favor, inserte un nombre válido.");
    return null;
  }

  nombre = nombre.trim();
  if (!/^[a-zA-ZáéíóúÁÉÍÓÚüÜ\s]+$/.test(nombre)) {
    alert("El nombre solo puede contener letras y espacios.");
    return null;
  }

  let partesNombre = nombre.split(" ");
  if (partesNombre.length > 2) {
    alert("Solo se permite un nombre y un apellido.");
    return null;
  }

  for (let i = 0; i < partesNombre.length; i++) {
    let parte = partesNombre[i];
    if (parte.length === 0) continue;
    if (parte[0] !== parte[0].toUpperCase()) {
      alert("Cada palabra debe empezar con mayúscula.");
      return null;
    }
    for (let j = 1; j < parte.length; j++) {
      if (parte[j] !== parte[j].toLowerCase()) {
        alert("Las letras después de la primera deben estar en minúscula.");
        return null;
      }
    }
  }

  let nombreNormalizado = partesNombre.join(" ");

  if (!formatoNombreInicial) {
    formatoNombreInicial = partesNombre.length;
  } else if (formatoNombreInicial !== partesNombre.length) {
    alert(
      "Debe usar el mismo formato de nombres: " +
      (formatoNombreInicial === 1 ? "solo nombre" : "nombre y apellido")
    );
    return null;
  }

  return nombreNormalizado;
}

function sortearAmigo() {
  let listaResultadoUI = document.getElementById("resultado");

  if (listaAmigos.length === 0) {
    listaResultadoUI.innerHTML = "<li>No hay amigos para sortear</li>";
    return;
  }

  let amigosDisponibles = listaAmigos.filter(a => !amigosSorteados.includes(a));

  if (amigosDisponibles.length === 0) {
    alert("¡Todos los amigos fueron sorteados! Reiniciando el juego.");
    listaAmigos = [];
    amigosSorteados = [];
    formatoNombreInicial = "";
    document.querySelector("#listaAmigos").innerHTML = "";
    document.querySelector("#resultado").innerHTML = "";
    return;
  }

  let indiceAleatorio = Math.floor(Math.random() * amigosDisponibles.length);
  let amigoSecreto = amigosDisponibles[indiceAleatorio];

  amigosSorteados.push(amigoSecreto);
  listaResultadoUI.innerHTML = "<li>El amigo secreto es: " + amigoSecreto + "</li>";
}
