"use strict";

const gTrans = {
  "gallery-tab": {
    en: "Gallery",
    he: "גלריה",
  },
  "memes-tab": {
    en: "Memes",
    he: "ממים",
  },
  "about-tab": {
    en: "About",
    he: "אודות",
  },
  "flexible-btn": {
    en: "Random",
    he: "אקראי",
  },
  "search-input": {
    en: "search",
    he: "חיפוש",
  },
  "meme-text-input": {
    en: "text-here",
    he: "כתוב פה",
  },
  "save-btn": {
    en: "save",
    he: "שמור",
  },
};

let gCurrLang;

function setLang(lang) {
  gCurrLang = lang;
}
function getTrans(key) {
  let keytrans = gTrans[key];
  let txt = keytrans[gCurrLang];
  console.log("translate", txt);
  return txt;
}
function doTrans() {
  let transKey;
  let txt;
  let els = document.querySelectorAll("[data-trans]");
  els.forEach((el) => {
    transKey = el.dataset.trans;
    txt = getTrans(transKey);
    if (el.nodeName === "INPUT") {
      el.placeholder = txt;
    } else el.innerText = txt;
  });
  setBodyDirection();
}
function setBodyDirection() {
  let body = document.querySelector("body");
  if (gCurrLang === "en") body.style.direction = "ltr";
  else if (gCurrLang === "he") body.style.direction = "rtl";
  document.querySelector("canvas").style.direction = "ltr";
}
