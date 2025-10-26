// Array global de tareas
let tareas = [];

// Cargar tareas almacenadas cuando se abre la página
window.onload = cargarTareas;

// Evento para el botón "Agregar"
document.getElementById("agregarBtn").addEventListener("click", agregarTarea);

// Función para agregar una nueva tarea
function agregarTarea() {
  let input = document.getElementById("nuevaTarea");
  let tarea = input.value.trim();

  if (tarea !== "") {
    tareas.push(tarea);
    input.value = "";
    guardarTareas();  // Guardar en localStorage
    mostrarTareas();
  } else {
    alert("Por favor escribe una tarea antes de agregarla.");
  }
}

// Función para mostrar todas las tareas en pantalla
function mostrarTareas() {
  let lista = document.getElementById("listaTareas");
  lista.innerHTML = "";

  tareas.forEach(function(tarea, index) {
    let li = document.createElement("li");
    li.textContent = tarea;

    // Crear botón de eliminar
    let btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.classList.add("eliminarBtn");

    // Evento para eliminar la tarea
    btnEliminar.addEventListener("click", function() {
      tareas.splice(index, 1);   // Quita del array
      guardarTareas();           // Guarda cambios en localStorage
      mostrarTareas();           // Actualiza la lista visual
    });

    li.appendChild(btnEliminar);
    lista.appendChild(li);
  });
}

// Guarda las tareas en localStorage
function guardarTareas() {
  localStorage.setItem("tareas", JSON.stringify(tareas));
}

// Carga las tareas desde localStorage (si existen)
function cargarTareas() {
  const datos = localStorage.getItem("tareas");
  if (datos) {
    tareas = JSON.parse(datos);
    mostrarTareas();
  }
}
