let peliculas = [];
const porVerTable = document.querySelector('#porVer tbody');
const vistasTable = document.querySelector('#vistas tbody');
const formulario = document.getElementById('formulario');
const titulo = document.getElementById('titulo');
const genero = document.getElementById('genero');
const estado = document.getElementById('estado');
const idCampo = document.getElementById('id');

function cargarPeliculas() {
  fetch('api.php')
    .then(res => res.json())
    .then(data => {
      peliculas = data;
      renderizar();
    });
}

function guardarPeliculas() {
  fetch('api.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(peliculas)
  });
}

function renderizar() {
  porVerTable.innerHTML = '';
  vistasTable.innerHTML = '';

  peliculas.forEach(p => {
    const fila = document.createElement('tr');
    fila.innerHTML = `<td>${p.titulo}</td><td>${p.genero}</td>
      <td>
        <button onclick="editar(${p.id})">✏️</button>
        <button onclick="eliminar(${p.id})">🗑️</button>
      </td>`;

    if (p.estado === 'por_ver') {
      porVerTable.appendChild(fila);
    } else {
      vistasTable.appendChild(fila);
    }
  });
}

formulario.addEventListener('submit', function (e) {
  e.preventDefault();
  const id = idCampo.value ? parseInt(idCampo.value) : Date.now();
  const nueva = { id, titulo: titulo.value, genero: genero.value, estado: estado.value };

  const index = peliculas.findIndex(p => p.id === id);
  if (index !== -1) {
    peliculas[index] = nueva;
  } else {
    peliculas.push(nueva);
  }

  guardarPeliculas();
  formulario.reset();
  renderizar();
});

function editar(id) {
  const peli = peliculas.find(p => p.id === id);
  if (peli) {
    titulo.value = peli.titulo;
    genero.value = peli.genero;
    estado.value = peli.estado;
    idCampo.value = peli.id;
  }
}

function eliminar(id) {
  peliculas = peliculas.filter(p => p.id !== id);
  guardarPeliculas();
  renderizar();
}

cargarPeliculas();
