"use strict";

function saveTotorage(key, item) {
  localStorage.setItem(key, JSON.stringify(item));
}

function loadFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
