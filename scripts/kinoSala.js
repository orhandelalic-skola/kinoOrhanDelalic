var trenutnaProjekcija = 0;

var validniStatusi = ["slobodno", "zauzeto", "rezervisano"];

function validirajPodatke(podaci) {
  if (!podaci.projekcije || podaci.projekcije.length === 0) {
    return false;
  }

  for (var i = 0; i < podaci.projekcije.length; i++) {
    var projekcija = podaci.projekcije[i];
    for (var j = 0; j < projekcija.sjedista.length; j++) {
      var status = projekcija.sjedista[j].status;
      if (validniStatusi.indexOf(status) === -1) {
        return false;
      }
    }
  }

  return true;
}

function init() {
  if (!validirajPodatke(podaci)) {
    var main = document.querySelector("main");
    main.innerHTML = "<p id='greska'>Podaci nisu validni!</p>";
    return;
  }
}

document.addEventListener("DOMContentLoaded", init);