function checkCapacity() {
    var xhr = new XMLHttpRequest();
  
    xhr.open("GET", "https://api.countapi.xyz/get/aldoRastrelli/" + idToday);
    xhr.responseType = "json";
    xhr.onload = function () {
      let booked = this.response.value ? this.response.value : 0;
      let capacityLeft = CAPACITY - booked;
      console.log(`Inscriptos: ${booked}.`);
      console.log(`Capacidad restante: ${capacityLeft}.`);
      if (capacityLeft <= 0) {
        setOutOfWorkMode(outOfOffice["FULL"]);
        return;
      }
    };
    xhr.send();
}

function sendData(data){
const formData = new FormData();
  formData.append(`${FORM_ENTRIES.Dia}`, data.dia.value);
  formData.append(`${FORM_ENTRIES.Horario}`, data.horario.value);
  formData.append(`${FORM_ENTRIES.Apellido}`, data.apellido.value);
  formData.append(`${FORM_ENTRIES.Nombre}`, data.nombre.value);
  formData.append(`${FORM_ENTRIES.DNI}`, data.dni.value);
  formData.append(`${FORM_ENTRIES.Email}`, data.email.value);

  fetch(`${FORM}`, {
    body: formData,
    mode: 'no-cors',
    method: "POST",
  }).then((r) => console.log(r))
  .catch((r) => console.error(r));
}

function update_inscriptions() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api.countapi.xyz/hit/aldoRastrelli/" + idToday);
    xhr.responseType = "json";
    xhr.onload = function () {
      console.log(`Inscripción ${this.response.value} OK`);
    };
    xhr.error = function(){console.log("hola")}
    xhr.send();
    
}