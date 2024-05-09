"user strict";
var gCanvas;
var gCtx;
var gCurrMeme;
var gImg;
var gFont = 50;
var gText = "text here lololo";
var gCurrColor = document.querySelector("#color-select").value;
var gCurrShape = "line";
var gFlag = false;
var gCurrLineIdx;

function checkIfMemeGen() {
  return document.querySelector(".meme-generator").classList.contains("flex");
}
function onAddTextLine() {
  addTextLine();
  renderMeme();
}
function initMemeController() {
  gCurrMeme = getMeme();
  gCanvas = document.querySelector(".canvas");
  gCtx = gCanvas.getContext("2d");
  addEventListeners();
}

function onChangeText(elInput) {
  gText = elInput.value;
  setLineTxt(elInput.value);
  renderMeme();
  document.querySelector(".meme-text").value = "";
}
function onColorChange(el) {
  gCurrColor = el.value;
  setLineColor(el.value);
  renderMeme();
}
function onStroke(el) {
  var strokeColor = el.value;
  setStrokeColor();
}
function onDeleteTextLine() {
  deleteLine();
  updateMeme(gMeme);
  renderMeme();
}
function renderMeme(x, y) {
  var img = new Image();
  var memeImg = getMemeImg();
  img.src = memeImg.url;
  img.onload = function () {
    if (x) {
      gCanvas.width = window.innerWidth / 2;
      gCanvas.height = gCanvas.width;
    }
    var location = { width: gCanvas.width, height: gCanvas.height };
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
    if (x & y) {
      setXandYloop(getMemeLines(), location);
    }
    drawTextLoop(getMemeLines());
  };
}
function setXandYloop(arr, location) {
  arr.forEach((item) => {
    setXandY(location, item);
    onTextAlign(item);
  });
}
function setXandY(location, obj) {
  var { width, height } = location;
  var meme = getMeme();
  if (obj.type === "sticker") {
    obj.location = {
      x: width - width,
      y: height / 2,
    };
  }
  if (obj.id === meme.lines[0].id) {
    if (obj.location) {
      if (isInCanvas(obj, width, height)) {
        return;
      }
    }
    obj.location = {
      x: width - width,
      y: height / 6,
    };
    return;
  } else if (obj.id === meme.lines[1].id) {
    if (obj.location) {
      if (isInCanvas(obj, width, height)) {
        return;
      }
    }
    obj.location = {
      x: width - width,
      y: height - height / 10,
    };
    return;
  } else
    obj.location = {
      x: width - width,
      y: height / 2,
    };
}
function isInCanvas(obj, width, height) {
  if (
    obj.location.x > width ||
    obj.location.x < width ||
    obj.location.y < height ||
    obj.location.y > height
  ) {
    return false;
  } else return true;
}
function drawRect(x, y) {
  gCtx.beginPath();
  gCtx.rect(x, y, 100, 100);
  gCtx.fillStyle = "";
  gCtx.fillRect(x, y, 100, 100);
  gCtx.strokeStyle = "orange";
  gCtx.stroke();
  gCtx.closePath();
}
function toggleMemeGenerator() {
  var elMemeGen = document.querySelector(".meme-generator");
  elMemeGen.classList.toggle("display-none");
  elMemeGen.classList.toggle("flex");
  toggleSearchBar();
}

function drawTextLoop(arr) {
  arr.forEach((item) => {
    drawText(item);
  });
}
function drawText(obj) {
  var text = setProperties(obj, "txt", gText);
  var color = setProperties(obj, "color", gCurrColor);
  var font = setProperties(obj, "size", gFont);
  var x = obj.location.x;
  var y = obj.location.y;
  gCtx.beginPath();
  gCtx.lineWidth = 2;
  gCtx.strokeStyle = "black";
  gCtx.fillStyle = color + "";
  gCtx.font = font + getFont();
  gCtx.fillText(text, x, y);
  gCtx.strokeText(text, x, y);
  gCtx.closePath();
  drawTextRect(obj);
  gCtx.closePath();
}
function getFont(x) {
  let font;
  font = "px" + " " + document.querySelector("#font-select").value;
  if (x) {
    renderMeme();
    return;
  }
  return font;
}
function onTextAlign(varx) {
  var x;
  var currLine;
  if (varx.value) {
    x = varx.value;
    currLine = getetCurrMemeLine();
  } else {
    currLine = varx;
    x = currLine.align;
  }
  var canvas = document.querySelector(".canvas");
  var ctx = gCanvas.getContext("2d");
  var mesaures = ctx.measureText(currLine.txt);
  switch (x) {
    case "left":
      currLine.location.x = 0;
      currLine.align = x;
      break;
    case "center":
      currLine.location.x = canvas.width / 2 - mesaures.width / 2;
      currLine.align = x;
      break;
    case "right":
      currLine.location.x = canvas.width - mesaures.width;
      currLine.align = x;
      break;
    default:
      break;
  }
  gMeme.lines[gCurrLineIdx] = currLine;
  updateMeme(gMeme);
  renderMeme();
}

function drawTextRect(obj) {
  var meme = getMeme();
  if (meme.lines.length <= 1) meme.selectedLineIdx = 0;
  else if (!checkMeme(obj)) return;
  var { x: x, y: y } = obj.location;
  var { txt: text, size: font } = obj;
  var lineWidth = gCtx.measureText(text).width;
  var lineHeight = font;
  drawFocus(x, y - lineHeight, lineWidth, lineHeight + 10);
}
function drawFocus(x, y, length, height) {
  gCtx.beginPath();
  gCtx.rect(x, y, length, height);
  gCtx.strokeStyle = "black";
  gCtx.stroke();
  gCtx.closePath();
}
function setProperties(obj, keyword, fallback) {
  if (obj) {
    if (obj[keyword]) return obj[keyword];
  } else return fallback;
}
function onSetFontSize(el) {
  setFont(el.value);
  gMeme = getMeme();
  renderMeme();
}

function onSwitchLine() {
  switchLine(gCurrLineIdx);
  gMeme = getMeme();
  renderMeme();
}

function onSaveMeme(elImg) {
  const dataURL = gCanvas.toDataURL();
  let meme = getMeme();
  meme.preview = dataURL;
  let savedMemes = [];
  if (loadFromStorage("savedMemes")) {
    savedMemes = loadFromStorage("savedMemes");
  }
  meme.id = savedMemes.length + 1;
  savedMemes.push(meme);
  saveTotorage("savedMemes", savedMemes);
  downloadCanvas(elImg);
}
function downloadCanvas(elImg) {
  console.log(elImg);
  var imgUrl = gCanvas.toDataURL("image/jpeg");
  console.log(elImg.href);
  elImg.href = imgUrl;
}
