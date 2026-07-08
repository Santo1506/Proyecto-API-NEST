// Estado y configuración
let apiUrl = localStorage.getItem('apiUrl') || 'http://localhost:3000';
let currentSection = 'dashboard';

const state = {
  profesores: [],
  estudiantes: [],
  cursos: [],
  inscripciones: [],
  editingId: null,
  editingType: null
};

// Funciones de API
async function apiCall(method, endpoint, data = null) {
  try {
    const options = {
      method,
      headers: { 'Content-Type': 'application/json' }
    };

    if (data) options.body = JSON.stringify(data);

    const response = await fetch(`${apiUrl}${endpoint}`, options);
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || `Error ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    showAlert(error.message, 'error');
    throw error;
  }
}

function showAlert(message, type = 'success') {
  const alert = document.getElementById('alert');
  alert.textContent = message;
  alert.className = `alert ${type}`;
  alert.hidden = false;

  setTimeout(() => {
    alert.hidden = true;
  }, 4000);
}

// PROFESORES
async function loadProfesores() {
  try {
    state.profesores = await apiCall('GET', '/api/profesores');
    renderProfesores();
    fillProfesoresSelect();
  } catch (error) {
    console.error('Error loading profesores:', error);
  }
}

function renderProfesores() {
  const tbody = document.getElementById('tablaProfesores');
  tbody.innerHTML = '';

  state.profesores.forEach(prof => {
    const row = `
      <tr>
        <td>${prof.id}</td>
        <td>${prof.nombre}</td>
        <td>${prof.correo}</td>
        <td>${prof.departamento}</td>
        <td>
          <div class="action-btns">
            <button class="btn-edit" onclick="editProfesor(${prof.id})">Editar</button>
            <button class="btn-delete" onclick="deleteProfesor(${prof.id})">Eliminar</button>
          </div>
        </td>
      </tr>
    `;
    tbody.innerHTML += row;
  });

  updateCount('countProfesores', state.profesores.length);
}

async function saveProfesor(e) {
  e.preventDefault();

  const id = document.getElementById('profId').value;
  const data = {
    nombre: document.getElementById('profNombre').value,
    correo: document.getElementById('profCorreo').value,
    departamento: document.getElementById('profesorDepartamento').value
  };

  try {
    if (id) {
      await apiCall('PUT', `/api/profesores/${id}`, data);
      showAlert('Profesor actualizado');
    } else {
      await apiCall('POST', '/api/profesores', data);
      showAlert('Profesor creado');
    }

    resetProfesorForm();
    loadProfesores();
  } catch (error) {
    console.error('Error saving profesor:', error);
  }
}

function editProfesor(id) {
  const prof = state.profesores.find(p => p.id === id);
  if (!prof) return;

  document.getElementById('profId').value = prof.id;
  document.getElementById('profNombre').value = prof.nombre;
  document.getElementById('profCorreo').value = prof.correo;
  document.getElementById('profesorDepartamento').value = prof.departamento;
}

async function deleteProfesor(id) {
  if (!confirm('¿Eliminar profesor?')) return;

  try {
    await apiCall('DELETE', `/api/profesores/${id}`);
    showAlert('Profesor eliminado');
    loadProfesores();
  } catch (error) {
    console.error('Error deleting profesor:', error);
  }
}

function resetProfesorForm() {
  document.getElementById('formProfesor').reset();
  document.getElementById('profId').value = '';
}

function fillProfesoresSelect() {
  const select = document.getElementById('curProfesor');
  select.innerHTML = '<option value="">Seleccionar Profesor</option>';
  state.profesores.forEach(prof => {
    select.innerHTML += `<option value="${prof.id}">${prof.nombre}</option>`;
  });
}

// ESTUDIANTES
async function loadEstudiantes() {
  try {
    state.estudiantes = await apiCall('GET', '/api/estudiantes');
    renderEstudiantes();
    fillEstudiantesSelect();
  } catch (error) {
    console.error('Error loading estudiantes:', error);
  }
}

function renderEstudiantes() {
  const tbody = document.getElementById('tablaEstudiantes');
  tbody.innerHTML = '';

  state.estudiantes.forEach(est => {
    const estadoBadge = `<span class="badge ${est.estado}">${est.estado}</span>`;
    const row = `
      <tr>
        <td>${est.id}</td>
        <td>${est.nombre}</td>
        <td>${est.correo}</td>
        <td>${est.carrera}</td>
        <td>${est.semestre_actual}</td>
        <td>${estadoBadge}</td>
        <td>
          <div class="action-btns">
            <button class="btn-edit" onclick="editEstudiante(${est.id})">Editar</button>
            <button class="btn-delete" onclick="deleteEstudiante(${est.id})">Eliminar</button>
          </div>
        </td>
      </tr>
    `;
    tbody.innerHTML += row;
  });

  updateCount('countEstudiantes', state.estudiantes.length);
}

async function saveEstudiante(e) {
  e.preventDefault();

  const id = document.getElementById('estId').value;
  const data = {
    nombre: document.getElementById('estNombre').value,
    correo: document.getElementById('estCorreo').value,
    carrera: document.getElementById('estCarrera').value,
    semestre_actual: parseInt(document.getElementById('estSemestre').value)
  };

  try {
    if (id) {
      await apiCall('PUT', `/api/estudiantes/${id}`, data);
      showAlert('Estudiante actualizado');
    } else {
      await apiCall('POST', '/api/estudiantes', data);
      showAlert('Estudiante creado');
    }

    resetEstudianteForm();
    loadEstudiantes();
  } catch (error) {
    console.error('Error saving estudiante:', error);
  }
}

function editEstudiante(id) {
  const est = state.estudiantes.find(e => e.id === id);
  if (!est) return;

  document.getElementById('estId').value = est.id;
  document.getElementById('estNombre').value = est.nombre;
  document.getElementById('estCorreo').value = est.correo;
  document.getElementById('estCarrera').value = est.carrera;
  document.getElementById('estSemestre').value = est.semestre_actual;
}

async function deleteEstudiante(id) {
  if (!confirm('¿Eliminar estudiante?')) return;

  try {
    await apiCall('DELETE', `/api/estudiantes/${id}`);
    showAlert('Estudiante eliminado');
    loadEstudiantes();
  } catch (error) {
    console.error('Error deleting estudiante:', error);
  }
}

function resetEstudianteForm() {
  document.getElementById('formEstudiante').reset();
  document.getElementById('estId').value = '';
}

function fillEstudiantesSelect() {
  const select = document.getElementById('insEstudiante');
  select.innerHTML = '<option value="">Seleccionar Estudiante</option>';
  state.estudiantes.forEach(est => {
    select.innerHTML += `<option value="${est.id}">${est.nombre}</option>`;
  });
}

// CURSOS
async function loadCursos() {
  try {
    state.cursos = await apiCall('GET', '/api/cursos');
    renderCursos();
    fillCursosSelect();
  } catch (error) {
    console.error('Error loading cursos:', error);
  }
}

function renderCursos() {
  const tbody = document.getElementById('tablaCursos');
  tbody.innerHTML = '';

  state.cursos.forEach(curso => {
    const profesorNombre = curso.profesor?.nombre || 'Sin asignar';
    const row = `
      <tr>
        <td>${curso.id}</td>
        <td>${curso.nombre}</td>
        <td>${curso.cant_creditos || '-'}</td>
        <td>${profesorNombre}</td>
        <td>${curso.cupo_max || '-'}</td>
        <td>
          <div class="action-btns">
            <button class="btn-edit" onclick="editCurso(${curso.id})">Editar</button>
            <button class="btn-delete" onclick="deleteCurso(${curso.id})">Eliminar</button>
          </div>
        </td>
      </tr>
    `;
    tbody.innerHTML += row;
  });

  updateCount('countCursos', state.cursos.length);
}

async function saveCurso(e) {
  e.preventDefault();

  const id = document.getElementById('curId').value;
  const data = {
    nombre: document.getElementById('curNombre').value,
    cant_creditos: parseInt(document.getElementById('curCreditos').value),
    profesor_id: parseInt(document.getElementById('curProfesor').value) || null,
    cupo_max: parseInt(document.getElementById('curCupo').value)
  };

  try {
    if (id) {
      await apiCall('PUT', `/api/cursos/${id}`, data);
      showAlert('Curso actualizado');
    } else {
      await apiCall('POST', '/api/cursos', data);
      showAlert('Curso creado');
    }

    resetCursoForm();
    loadCursos();
  } catch (error) {
    console.error('Error saving curso:', error);
  }
}

function editCurso(id) {
  const curso = state.cursos.find(c => c.id === id);
  if (!curso) return;

  document.getElementById('curId').value = curso.id;
  document.getElementById('curNombre').value = curso.nombre;
  document.getElementById('curCreditos').value = curso.cant_creditos || '';
  document.getElementById('curProfesor').value = curso.profesor_id || '';
  document.getElementById('curCupo').value = curso.cupo_max || '';
}

async function deleteCurso(id) {
  if (!confirm('¿Eliminar curso?')) return;

  try {
    await apiCall('DELETE', `/api/cursos/${id}`);
    showAlert('Curso eliminado');
    loadCursos();
  } catch (error) {
    console.error('Error deleting curso:', error);
  }
}

function resetCursoForm() {
  document.getElementById('formCurso').reset();
  document.getElementById('curId').value = '';
}

function fillCursosSelect() {
  const select = document.getElementById('insCurso');
  select.innerHTML = '<option value="">Seleccionar Curso</option>';
  state.cursos.forEach(curso => {
    select.innerHTML += `<option value="${curso.id}">${curso.nombre}</option>`;
  });
}

// INSCRIPCIONES
async function loadInscripciones() {
  try {
    state.inscripciones = await apiCall('GET', '/api/inscripciones');
    renderInscripciones();
  } catch (error) {
    console.error('Error loading inscripciones:', error);
  }
}

function renderInscripciones() {
  const tbody = document.getElementById('tablaInscripciones');
  tbody.innerHTML = '';

  state.inscripciones.forEach(ins => {
    const est = state.estudiantes.find(e => e.id === ins.estudiante_id);
    const curso = state.cursos.find(c => c.id === ins.curso_id);
    const estNombre = est?.nombre || `Est #${ins.estudiante_id}`;
    const cursoNombre = curso?.nombre || `Curso #${ins.curso_id}`;
    const fecha = new Date(ins.fechaIns).toLocaleDateString('es-CO');
    const estadoBadge = `<span class="badge ${ins.estado}">${ins.estado}</span>`;

    const row = `
      <tr>
        <td>${ins.id}</td>
        <td>${estNombre}</td>
        <td>${cursoNombre}</td>
        <td>${estadoBadge}</td>
        <td>${fecha}</td>
        <td>
          <div class="action-btns">
            <button class="btn-edit" onclick="editInscripcion(${ins.id})">Editar</button>
            <button class="btn-delete" onclick="deleteInscripcion(${ins.id})">Eliminar</button>
          </div>
        </td>
      </tr>
    `;
    tbody.innerHTML += row;
  });

  updateCount('countInscripciones', state.inscripciones.length);
}

async function saveInscripcion(e) {
  e.preventDefault();

  const id = document.getElementById('insId').value;
  const data = {
    estudiante_id: parseInt(document.getElementById('insEstudiante').value),
    curso_id: parseInt(document.getElementById('insCurso').value),
    estado: document.getElementById('insEstado').value
  };

  try {
    if (id) {
      await apiCall('PUT', `/api/inscripciones/${id}`, data);
      showAlert('Inscripción actualizada');
    } else {
      await apiCall('POST', '/api/inscripciones', data);
      showAlert('Inscripción creada');
    }

    resetInscripcionForm();
    loadInscripciones();
  } catch (error) {
    console.error('Error saving inscripcion:', error);
  }
}

function editInscripcion(id) {
  const ins = state.inscripciones.find(i => i.id === id);
  if (!ins) return;

  document.getElementById('insId').value = ins.id;
  document.getElementById('insEstudiante').value = ins.estudiante_id;
  document.getElementById('insCurso').value = ins.curso_id;
  document.getElementById('insEstado').value = ins.estado;
}

async function deleteInscripcion(id) {
  if (!confirm('¿Eliminar inscripción?')) return;

  try {
    await apiCall('DELETE', `/api/inscripciones/${id}`);
    showAlert('Inscripción eliminada');
    loadInscripciones();
  } catch (error) {
    console.error('Error deleting inscripcion:', error);
  }
}

function resetInscripcionForm() {
  document.getElementById('formInscripcion').reset();
  document.getElementById('insId').value = '';
}

// UTILIDADES
function updateCount(elementId, count) {
  document.getElementById(elementId).textContent = count;
}

async function loadAll() {
  await Promise.all([loadProfesores(), loadEstudiantes(), loadCursos(), loadInscripciones()]);
}

function switchSection(section) {
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.section === section);
  });

  document.querySelectorAll('.section').forEach(sec => {
    sec.classList.toggle('active', sec.id === section);
  });

  const titles = {
    dashboard: 'Dashboard',
    profesores: 'Profesores',
    estudiantes: 'Estudiantes',
    cursos: 'Cursos',
    inscripciones: 'Inscripciones'
  };

  document.getElementById('pageTitle').textContent = titles[section] || 'Dashboard';

  if (section === 'dashboard') {
    loadAll();
  } else if (section === 'profesores') {
    loadProfesores();
  } else if (section === 'estudiantes') {
    loadEstudiantes();
  } else if (section === 'cursos') {
    loadCursos();
  } else if (section === 'inscripciones') {
    loadInscripciones();
  }
}

// EVENT LISTENERS
document.addEventListener('DOMContentLoaded', () => {
  // API Config
  document.getElementById('saveUrl').addEventListener('click', () => {
    const url = document.getElementById('apiUrl').value;
    localStorage.setItem('apiUrl', url);
    apiUrl = url;
    showAlert('URL guardada');
  });

  document.getElementById('testApi').addEventListener('click', async () => {
    try {
      await apiCall('GET', '/api/profesores');
      showAlert('Conexión exitosa ✓', 'success');
    } catch (error) {
      showAlert('Error de conexión', 'error');
    }
  });

  // Nav buttons
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => switchSection(btn.dataset.section));
  });

  // Forms
  document.getElementById('formProfesor').addEventListener('submit', saveProfesor);
  document.getElementById('cancelProf').addEventListener('click', resetProfesorForm);

  document.getElementById('formEstudiante').addEventListener('submit', saveEstudiante);
  document.getElementById('cancelEst').addEventListener('click', resetEstudianteForm);

  document.getElementById('formCurso').addEventListener('submit', saveCurso);
  document.getElementById('cancelCur').addEventListener('click', resetCursoForm);

  document.getElementById('formInscripcion').addEventListener('submit', saveInscripcion);
  document.getElementById('cancelIns').addEventListener('click', resetInscripcionForm);

  // Refresh button
  document.getElementById('refreshBtn').addEventListener('click', () => {
    loadAll();
    showAlert('Datos actualizados');
  });

  // Initial load
  loadAll();
});
