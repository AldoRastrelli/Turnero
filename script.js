// ***********   CONSTS  *******
let weekday = new Array(5);
        weekday[0] = "Lunes";
        weekday[1] = "Martes";
        weekday[2] = "Miércoles";
        weekday[3] = "Jueves";
        weekday[4] = "Viernes";

const outOfOffice = {
	"WEEKEND": "<br><b>CERRADO POR FIN DE SEMANA 🏖</b> <br>No se puede sacar turno para el día de mañana.<br>Volvé el Domingo!<br><br>",
	"LATE": "<br><b>CERRADO POR HOY 😴</b> <br>Ya no se pueden sacar turnos para mañana.<br><br>",
}

let opensAt = 8
let closesAt = 180

// *** executes when the app loads *****
loadDayOptions()
loadTimeOptions()


// ****** functions *******
function loadDayOptions() {
  var today = new Date();  
  
  var dayoftheweek = today.getDay();
  dayoftheweek = weekday[dayoftheweek];
  if (!dayoftheweek){
    setOutOfWorkMode(outOfOffice["WEEKEND"])
    return
  }
  
  // limits the app between working hours
  if (today.getHours() > closesAt){
    setOutOfWorkMode(outOfOffice["LATE"])
    return
  }
  
  var date = dayoftheweek + " " + (today.getDate()+1)+'/'+(today.getMonth()+1)+'/'+today.getFullYear();

  var el = document.createElement("option");
  el.textContent = date;
  el.value = date;
  var selectDia = document.getElementById("selectDia");
  selectDia.appendChild(el);
}

function setOutOfWorkMode(reason){
  var content = document.getElementById("content");
  content.style.display = "none";
  var disclaimer = document.getElementById("disclaimer");
  disclaimer.innerHTML = reason;
  disclaimer.style.display = "block";
  return
}

function loadTimeOptions(){
  var selectHora = document.getElementById("selectHora");
  var time = "";
  for (let i = opensAt; i < closesAt; i++) {
    
    time = (i < 10) ? '0' + i + ':00' : i + ':00';
    
    var el = document.createElement("option");
    el.textContent = time;
    el.value = time;
    selectHora.appendChild(el);
  }
}

function authenticate() {
  return gapi.auth2.getAuthInstance()
      .signIn({api_key: 'AIzaSyDq4CykLmsYESFmwFYMS-zxtEe46S914Z4',
      client_id: '766955097981-d1luidf104ore17lr91mvd1jis2qktnh.apps.googleusercontent.com',
      scope: "https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/spreadsheets",
      discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],})
      .then(function() { console.log("Sign-in successful"); },
            function(err) { console.error("Error signing in", err); });
}
function loadClient() {
  gapi.client.setApiKey("AIzaSyDq4CykLmsYESFmwFYMS-zxtEe46S914Z4");
  return gapi.client.load("https://sheets.googleapis.com/$discovery/rest?version=v4")
      .then(function() { console.log("GAPI client loaded for API"); },
            function(err) { console.error("Error loading GAPI client for API", err); });
}
// Make sure the client is loaded and sign-in is complete before calling this method.
function execute() {
  return gapi.client.sheets.spreadsheets.values.append({
    "spreadsheetId": "1Ik10OHJ4aGfEXVkLkM8IwCY12jUzxpxAdJRKYsnYeAw",
    "range": "Sheet1",
    "valueInputOption": "RAW",
    "resource": {
      "values": [
        [
          "valores",
          "valores2",
          "Etc"
        ]
      ]
    }
  })
      .then(function(response) {
              // Handle the results here (response.result has the parsed body).
              console.log("Response", response);
            },
            function(err) { console.error("Execute error", err); });
}

gapi.load("client:auth2", function() {
  gapi.auth2.init({client_id: "766955097981-d1luidf104ore17lr91mvd1jis2qktnh.apps.googleusercontent.com",
  api_key: 'AIzaSyDq4CykLmsYESFmwFYMS-zxtEe46S914Z4',
  scope: 'https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/spreadsheets',
  discovery_docs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
});
});