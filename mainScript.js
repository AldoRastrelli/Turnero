// **** editable consts ****

const outOfOffice = {
  WEEKEND:
    "<br><b>CERRADO POR FIN DE SEMANA 🗓</b> <br>No se puede sacar turno para el día de mañana.<br>Volvé el próximo día hábil!<br><br>",
  LATE: "<br><b>CERRADO POR HOY 😴</b> <br>Ya no se pueden sacar turnos para mañana.<br><br>",
  FULL: "<br><b>No nos quedan espacios disponibles para ingresar a FIUBA 😥 </b> <br>Ya no se pueden sacar turnos para mañana.<br><br>",
  HOLIDAY: "<br><b>CERRADO POR HOY 🗓</b> <br>No se puede sacar turno en este momento.<br>Volvé el próximo día hábil!<br><br>",
  ENERO: "<br><b>CERRADO DURANTE ENERO 🗓</b> <br>La Facultad permanecerá cerrada durante todo el mes de enero.<br>No se puede sacar turno por ahora!<br>Nos vemos en febrero 👋<br><br>",
  FREEACCESS: "A partir de <b>Febrero del 2022</b>, todos los estudiantes regulares tienen el ingreso habilitado por DNI a través del sistema de molinetes.</br>Nos vemos en FIUBA!",
};

const CAPACITY = 30;
const closesAt = 16;
const horarios = ["11:00 a 14:00", "14:00 a 17:00", "11:00 a 17:00"];

const HOLIDAYS = {}

// **** other consts ****
const weekday = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
var showForm = true;
// **** inputs *****

let dia = document.getElementById("selectDia");
let horario = document.getElementById("selectHora");
let apellido = document.getElementById("inputApellido");
let nombre = document.getElementById("inputNombre");
let dni = document.getElementById("inputDNI");
let email = document.getElementById("inputEmail");

let inputs = [apellido, nombre, dni, email];
let data = {
  dia : dia,
  horario : horario,
  apellido : apellido,
  nombre : nombre,
  dni : dni,
  email : email
}

let today = getToday();
let idToday = getStringDate(today, "", 0);

// *** executes when the app loads *****

window.onload = function () {
  setOutOfWorkMode(outOfOffice["FREEACCESS"]);
//   $.when(checkCapacity()).then(function(){
//     loadDayOptions();
//   loadTimeOptions();
//   tryShowForm();
// })

};

// ****** functions *******

function loadDayOptions() {
  var dayoftheweek = today.getDay();

  if (isWeekend(dayoftheweek)) {
    setOutOfWorkMode(outOfOffice["WEEKEND"]);
    return;
  }
  if (isHoliday(today)) {
    console.log("holiday")
    setOutOfWorkMode(outOfOffice["HOLIDAY"]);
    return;
  }

  var date = getCompleteDate(today)
  date = changeIfHoliday(date)

  var el = document.createElement("option");
  el.textContent = date;
  el.value = date;
  var selectDia = dia;
  selectDia.appendChild(el);
}

function setOutOfWorkMode(reason) {
  var content = document.getElementById("content");
  content.style.display = "none";
  var disclaimer = document.getElementById("disclaimerBelow");
  disclaimer.innerHTML = reason;
  disclaimer.style.display = "block";
  showForm = false;
  return;
}

function loadTimeOptions() {
  if (!showForm) {return;}

  // limits the app between working hours
  if (today.getHours() >= closesAt) {
    setOutOfWorkMode(outOfOffice["LATE"]);
    return;
  }

  var selectHora = document.getElementById("selectHora");
  for (pos in horarios) {
    var el = document.createElement("option");
    el.textContent = horarios[pos];
    el.value = horarios[pos];
    selectHora.appendChild(el);
  }
}

// **** save flow ****

function save() {
  setLoadingView();
  sendData(data);
  showConfirmation();
  update_inscriptions();
}

function showConfirmation() {
  $("#myModal").modal();
}

function reload() {
  for (pos in inputs) {
    inputs[pos].value = "";
  }
  setNormalView();
}

function toggleButton(ref, bttnID) {
  document.getElementById(bttnID).disabled =
    dia.value &&
    horario.value !== horario.defaultValue &&
    apellido.value !== apellido.defaultValue &&
    nombre.value !== nombre.defaultValue &&
    dni.value !== dni.defaultValue &&
    email.value !== email.defaultValue
      ? false
      : true;
}

function tryShowForm() {
  if (!showForm) { return }
  var content = document.getElementById("content");
  content.style.display = "block";
}