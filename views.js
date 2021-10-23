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
