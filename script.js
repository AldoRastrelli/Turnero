// ***********   CONSTS  *******
let weekday = new Array(5);
weekday[0] = "Lunes";
weekday[1] = "Martes";
weekday[2] = "Miércoles";
weekday[3] = "Jueves";
weekday[4] = "Viernes";

let CAPACITY = 30;
var capacityLeft;

let dia = document.getElementById("selectDia");
let horario = document.getElementById("selectHora");
let apellido = document.getElementById("inputApellido");
let nombre = document.getElementById("inputNombre");
let dni = document.getElementById("inputDNI");
let email = document.getElementById("inputEmail");

let inputs = [apellido, nombre, dni, email];

const outOfOffice = {
  WEEKEND:
    "<br><b>CERRADO POR FIN DE SEMANA 🏖</b> <br>No se puede sacar turno para el día de mañana.<br>Volvé el Domingo!<br><br>",
  LATE: "<br><b>CERRADO POR HOY 😴</b> <br>Ya no se pueden sacar turnos para mañana.<br><br>",
  FULL: "<br><b>No nos quedan espacios disponibles para ingresar a FIUBA 😥 </b> <br>Ya no se pueden sacar turnos para mañana.<br><br>",
};

let closesAt = 17;

let horarios = ["10:00 a 13:00", "13:00 a 18:00", "10:00 a 18:00"];

// Client ID and API key from the Developer Console
var CLIENT_ID =
  "766955097981-d1luidf104ore17lr91mvd1jis2qktnh.apps.googleusercontent.com";
var API_KEY = "AIzaSyDq4CykLmsYESFmwFYMS-zxtEe46S914Z4";

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = [
  "https://sheets.googleapis.com/$discovery/rest?version=v4",
  "https://people.googleapis.com/$discovery/rest",
];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES =
  "https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/spreadsheets";

// *** executes when the app loads *****
loadDayOptions();
loadTimeOptions();

// ****** functions *******
function loadDayOptions() {
  var today = new Date();

  var dayoftheweek = today.getDay();
  dayoftheweek = weekday[dayoftheweek];
  if (!dayoftheweek) {
    setOutOfWorkMode(outOfOffice["WEEKEND"]);
    return;
  }

  // limits the app between working hours
  if (today.getHours() > closesAt) {
    setOutOfWorkMode(outOfOffice["LATE"]);
    return;
  }

  var date =
    dayoftheweek +
    " " + getStringDate(today, "/")

  var el = document.createElement("option");
  el.textContent = date;
  el.value = date;
  var selectDia = dia;
  selectDia.appendChild(el);
}

function getStringDate(date, separator) {
  console.log((date.getDate() + 1) + separator + (date.getMonth() + 1) + separator + date.getFullYear());
  return (date.getDate() + 1) + separator + (date.getMonth() + 1) + separator + date.getFullYear();
}

function setOutOfWorkMode(reason) {
  var content = document.getElementById("content");
  content.style.display = "none";
  var disclaimer = document.getElementById("disclaimer");
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

function save() {
  setLoadingView();

  const formData = new FormData();
  formData.append(`${FORM_ENTRIES.Dia}`, dia.value);
  formData.append(`${FORM_ENTRIES.Horario}`, horario.value);
  formData.append(`${FORM_ENTRIES.Apellido}`, apellido.value);
  formData.append(`${FORM_ENTRIES.Nombre}`, nombre.value);
  formData.append(`${FORM_ENTRIES.DNI}`, dni.value);
  formData.append(`${FORM_ENTRIES.Email}`, email.value);

  // fetch(`${FORM}`, {
  //   body: formData,
  //   mode: 'no-cors',
  //   method: "POST",
  // }).then((r) => console.log(r))
  // .catch((r) => console.error(r));

  showConfirmation();
  update_inscriptions();
}

function setLoadingView() {
  var button = document.getElementById("saveButton");
  button.innerHTML = "GUARDANDO";
  button.disabled = true;
}

function setNormalView() {
  var button = document.getElementById("saveButton");
  button.innerHTML = "GUARDAR";
  button.disabled = true;
  checkCapacity();
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

function update_inscriptions() {
    var xhr = new XMLHttpRequest();
    let today = new Date();
    let idToday =  getStringDate(today,'');
    console.log(idToday);
    xhr.open("GET", "https://api.countapi.xyz/hit/aldoRastrelli/" + idToday);
    xhr.responseType = "json";
    xhr.onload = function() {
        let capacityLeft = CAPACITY - this.response.value
        console.log(`Inscripción ${this.response.value} OK`);
    }
    xhr.send();
}

window.onload = function() {
  checkCapacity();
};

function checkCapacity() {
  var xhr = new XMLHttpRequest();
    let today = new Date();
    let idToday =  getStringDate(today,'');
    console.log(idToday);
    xhr.open("GET", "https://api.countapi.xyz/get/aldoRastrelli/" + idToday);
    xhr.responseType = "json";
    xhr.onload = function() {
        let capacityLeft = CAPACITY - this.response.value
        console.log(`Inscriptos: ${this.response.value}.`);
        console.log(`Capacidad restante: ${capacityLeft}.`);
        if (capacityLeft <= 0){
          setOutOfWorkMode(outOfOffice["FULL"]);
          return;
        }
    }
    xhr.send();
}

