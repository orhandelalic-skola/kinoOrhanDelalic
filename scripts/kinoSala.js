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

function prikaziInfo(projekcija) {
  var infoDiv = document.getElementById("info-projekcije");
  infoDiv.innerHTML =
    "<p><strong>Naziv filma:</strong> " + projekcija.film + "</p>" +
    "<p><strong>Projekcija:</strong> " + projekcija.vrijeme + "</p>" +
    "<p><strong>Sala:</strong> " + projekcija.sala + "</p>";
}

function prikaziSalu(projekcija) {
  var salaDiv = document.getElementById("sala");
  salaDiv.innerHTML = "";

  var redovi = {};
  for (var i = 0; i < projekcija.sjedista.length; i++) {
    var sjediste = projekcija.sjedista[i];
    if (!redovi[sjediste.red]) {
      redovi[sjediste.red] = [];
    }
    redovi[sjediste.red].push(sjediste);
  }

  var oznakaReda = Object.keys(redovi).sort();

  for (var r = 0; r < oznakaReda.length; r++) {
    var red = oznakaReda[r];
    var sjedistaNiRed = redovi[red];

    var redDiv = document.createElement("div");
    redDiv.className = "red";

    var oznakaSpan = document.createElement("span");
    oznakaSpan.className = "oznaka-reda";
    oznakaSpan.textContent = red;
    redDiv.appendChild(oznakaSpan);

    var sjedistaDiv = document.createElement("div");
    sjedistaDiv.className = "sjedista";

    for (var s = 0; s < sjedistaNiRed.length; s++) {
      sjedistaDiv.appendChild(napraviSjediste(sjedistaNiRed[s], projekcija));
    }

    redDiv.appendChild(sjedistaDiv);
    salaDiv.appendChild(redDiv);
  }
}

function napraviSjediste(sjediste, projekcija) {
  var div = document.createElement("div");
  div.className = "sjediste " + sjediste.status;
  div.title = "Red " + sjediste.red + ", Mjesto " + sjediste.broj + " – " + sjediste.status;

  div.addEventListener("click", function() {
    if (sjediste.status === "slobodno") {
      sjediste.status = "rezervisano";
      prikaziSalu(projekcija);
    }
  });

  return div;
}

function prikaziProjekciju(indeks) {
  var projekcija = podaci.projekcije[indeks];
  prikaziInfo(projekcija);
  prikaziSalu(projekcija);
}

function init() {
  if (!validirajPodatke(podaci)) {
    var main = document.querySelector("main");
    main.innerHTML = "<p id='greska'>Podaci nisu validni!</p>";
    return;
  }

  document.getElementById("btn-prethodna").addEventListener("click", function() {
    if (trenutnaProjekcija > 0) {
      trenutnaProjekcija--;
      prikaziProjekciju(trenutnaProjekcija);
    }
  });

  document.getElementById("btn-sljedeca").addEventListener("click", function() {
    if (trenutnaProjekcija < podaci.projekcije.length - 1) {
      trenutnaProjekcija++;
      prikaziProjekciju(trenutnaProjekcija);
    }
  });

  prikaziProjekciju(trenutnaProjekcija);
}

document.addEventListener("DOMContentLoaded", init);