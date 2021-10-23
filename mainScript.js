// **** editable consts ****

const outOfOffice = {
  WEEKEND:
    "<br><b>CERRADO POR FIN DE SEMANA 🏖</b> <br>No se puede sacar turno para el día de mañana.<br>Volvé el Domingo!<br><br>",
  LATE: "<br><b>CERRADO POR HOY 😴</b> <br>Ya no se pueden sacar turnos para mañana.<br><br>",
  FULL: "<br><b>No nos quedan espacios disponibles para ingresar a FIUBA 😥 </b> <br>Ya no se pueden sacar turnos para mañana.<br><br>",
};

const CAPACITY = 30;
const closesAt = 16;
const horarios = ["10:00 a 13:00", "13:00 a 18:00", "10:00 a 18:00"];

// **** other consts ****
const weekday = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

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
  checkCapacity();
  loadDayOptions();
  loadTimeOptions();
};

// ****** functions *******

function loadDayOptions() {
  var dayoftheweek = today.getDay();
  if (isWeekend(dayoftheweek)) {
    setOutOfWorkMode(outOfOffice["WEEKEND"]);
    return;
  }
  // limits the app between working hours
  if (today.getHours() >= closesAt) {
    setOutOfWorkMode(outOfOffice["LATE"]);
    return;
  }

  let weekdayDay = isFriday(dayoftheweek) ? weekday[0] : weekday[dayoftheweek];
  let extraFactor = isFriday(dayoftheweek) ? 3 : 1;

  let date = weekdayDay + " " + getStringDate(today, "/", extraFactor);

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
  return;
}

function loadTimeOptions() {
  var selectHora = document.getElementById("selectHora");
  var time = "";
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
    dia.value !== dia.defaultValue &&
    horario.value !== horario.defaultValue &&
    apellido.value !== apellido.defaultValue &&
    nombre.value !== nombre.defaultValue &&
    dni.value !== dni.defaultValue &&
    email.value !== email.defaultValue
      ? false
      : true;
}