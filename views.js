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

function setOutOfWorkMode(reason) {
  var content = document.getElementById("content");
  content.style.display = "none";
  var disclaimer = document.getElementById("disclaimerBelow");
  disclaimer.innerHTML = reason;
  disclaimer.style.display = "block";
  return;
}