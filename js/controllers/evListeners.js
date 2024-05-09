"use strict";
let gIsDrag;
let gStartPos;
let gWindowSize;
function addEventListeners() {
  gWindowSize = { width: window.innerWidth, height: window.innerHeight };
  gCanvas.style.cursor = "grab";
  addMouseListenersToCanvas();
  addTouchListenersToCanvas();
  window.addEventListener("resize", addListenerToWindowResize);
}
function addListenerToWindowResize() {
  setTimeout(() => {
    resizeCanvas();
  }, 100);
}
function addMouseListenersToCanvas() {
  gCanvas.addEventListener("mousemove", onMove);
  gCanvas.addEventListener("mousedown", onDown);
  gCanvas.addEventListener("mouseup", onUp);
  gCanvas.addEventListener("mouseLeave", onOut);
}
function addTouchListenersToCanvas() {
  gCanvas.addEventListener("touchmove", onMove);
  gCanvas.addEventListener("touchstart", onDown);
  gCanvas.addEventListener("touchend", onUp);
}
function resizeCanvas() {
  const elContainer = document.querySelector(".meme-generator");

  if (window.innerWidth >= 650) {
    fixMenu();
  }
  if (!elContainer.classList.contains("display-none")) {
    gMeme.lines.forEach((element) => {
      let x = checkWindowSize();
      if (x === "+") {
        if (element.size > 80) return;
        element.size = element.size + 0.5;
      } else if (x === "-") {
        if (element.size < 25) return;
        element.size = element.size - 0.5;
      }
    });

    gWindowSize.width = window.innerWidth;
    gWindowSize.height = window.innerHeight;
    renderMeme(true, true);
  }
  // gCanvas.height = elContainer.offsetHeight;
}
function fixMenu() {
  let elmenu = document.querySelector(".header-nav");
  let directChildren = elmenu.children;
  elmenu.style.transform = "none";
  elmenu.style.transition = "0.3s";
}
function checkWindowSize() {
  if (gWindowSize.width > window.innerWidth) return "-";
  else if (gWindowSize.width < window.innerWidth) return "+";
}

function onDown(ev) {
  ev.preventDefault();
  let pos = getEvPos(ev);
  if (isMemePressed(pos)) {
    gIsDrag = true;
    gStartPos = pos;
    gCanvas.style.cursor = "grabbing";
  }
}
function isMemePressed(pos) {
  let meme = getMeme();
  let line = meme.lines[meme.selectedLineIdx];
  let measures = gCtx.measureText(line);
  if (
    line.location.x <= pos.x &&
    pos.x <= measures.width + line.location.x &&
    line.location.y - line.size <= pos.y &&
    pos.y <= line.location.y
  ) {
    return true;
  } else return false;
}

function onUp(ev) {
  ev.preventDefault();
  if (gIsDrag) gIsDrag = false;
  gCanvas.style.cursor = "grab";
}
function onOut(ev) {
  ev.preventDefault();
  if (gIsDrag) gIsDrag = false;
  gCanvas.style.cursor = "grab";
}

function onMove(ev) {
  ev.preventDefault();
  if (gIsDrag) {
    let pos = getEvPos(ev);
    let dX = gStartPos.x - pos.x;
    let dy = gStartPos.y - pos.y;
    moveLine(dX, dy);
    gStartPos = pos;
    renderMeme();
  }
}
function getEvPos(ev) {
  return {
    x: ev.offsetX,
    y: ev.offsetY,
  };
}
