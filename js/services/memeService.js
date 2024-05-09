"use strict";
var gLastIdx;
var gKeywordSearchCountMap = { funny: 12, cat: 16, baby: 2 };
var gImgs = [
  {
    id: 1,
    url: "meme-imgs (square)/1.jpg",
    keywords: ["politician", "angry", "trump", "funny"],
  },
  {
    id: 2,
    url: "meme-imgs (square)/2.jpg",
    keywords: ["dog", "cute", "love", "funny"],
  },
  {
    id: 3,
    url: "meme-imgs (square)/3.jpg",
    keywords: ["dog", "baby", "sleep", "funny", "cute"],
  },
  {
    id: 4,
    url: "meme-imgs (square)/4.jpg",
    keywords: ["cat", "Computer", "sleep", "funny", "cute"],
  },
  {
    id: 5,
    url: "meme-imgs (square)/5.jpg",
    keywords: ["baby", "funny", "victory", "cute"],
  },
  {
    id: 6,
    url: "meme-imgs (square)/6.jpg",
    keywords: ["funny", "history", "explain", "smile"],
  },
  {
    id: 7,
    url: "meme-imgs (square)/7.jpg",
    keywords: ["funny", "baby", "surprise", "smile"],
  },
  {
    id: 8,
    url: "meme-imgs (square)/8.jpg",
    keywords: ["funny", "listen", "judge", "surprise", "smile"],
  },
  {
    id: 9,
    url: "meme-imgs (square)/9.jpg",
    keywords: ["funny", "baby", "laugh", "smile"],
  },
  {
    id: 10,
    url: "meme-imgs (square)/10.jpg",
    keywords: ["funny", "smile", "politician", "obama"],
  },
  {
    id: 11,
    url: "meme-imgs (square)/11.jpg",
    keywords: ["funny", "sport", "gay", "fight", "angry"],
  },
  {
    id: 12,
    url: "meme-imgs (square)/12.jpg",
    keywords: ["funny", "you", "judge", "guilty"],
  },
  {
    id: 13,
    url: "meme-imgs (square)/13.jpg",
    keywords: ["funny", "cheers", "actor", "invite", "you"],
  },
  {
    id: 14,
    url: "meme-imgs (square)/14.jpg",
    keywords: ["funny", "surprise", "serious", "glasses", "judge"],
  },
  { id: 15, url: "meme-imgs (square)/15.jpg", keywords: ["funny", "explain"] },
  {
    id: 16,
    url: "meme-imgs (square)/16.jpg",
    keywords: ["funny", "smile", "cry", "surprise"],
  },
  {
    id: 17,
    url: "meme-imgs (square)/17.jpg",
    keywords: ["funny", "putin", "serious", "politician", "angry", "threat"],
  },
  {
    id: 18,
    url: "meme-imgs (square)/18.jpg",
    keywords: ["funny", "toy", "children", "look", "surprise", "explain"],
  },
];
let gStickerPageSize = 4;
let gStickerPageIdx = 0;
let gStickers = [
  "👙",
  "👓",
  "👚",
  "💍",
  "👑",
  "👛",
  "👜",
  "👝",
  "🎒",
  "👞",
  "👟",
  "💼",
  "👒",
  "🎩",
  "🎓",
  "🎶",
];
function addImg(img) {
  let id = gImgs.length + 1;
  gImgs.push({ id, url: img });
  gMemes.push(createMeme(id));
  console.log("gImgs", gImgs);
  console.log("gMemes", gMemes);
  toggleGallery();
  toggleMemeGenerator();
  document.querySelector(".flexible").style.visibility = "hidden";
  setImg(id);
}
function filterGallery(val) {
  let newArr = [];
  let x;
  gImgs.forEach((item) => {
    x = item.keywords.find((keyword) => {
      return keyword === val;
    });
    if (x === val) newArr.push(item);
  });
  if (val === "" || !val || newArr.length < 1) {
    renderGallery();
    return;
  }
  renderGallery(newArr);
}

function createImgArr() {}
var gMemes = createMemes();
function createMemes(arr) {
  var memesArr = [];
  gImgs.forEach((item) => {
    memesArr.push(createMeme(item));
  });
  return memesArr;
}
function createMeme(item) {
  let selectedImgId;
  if (item.id) selectedImgId = item.id;
  else selectedImgId = item;
  return {
    selectedImgId: selectedImgId,
    selectedLineIdx: 0,
    lines: createMemeLines(2),
  };
}
function createMemeLines(num) {
  var arr = [];
  for (var i = 0; i < num; i++) {
    arr.push(createLine());
  }
  return arr;
}
function createLine(x) {
  let txt;
  if (x) {
    txt = x;
  } else {
    txt = getRandomText();
  }
  return {
    txt,
    size: 50,
    color: getRandomColor(),
    id: getRandomId(5),
    align: "center",
  };
}
function setStickerLine(sticker) {
  let x = createLine(sticker);
  gMeme.lines.push(x);
  renderMeme(true, true);
}
function getRandomColor() {
  var randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return "#" + randomColor;
}
function getRandomText() {
  var things = [
    "Rock",
    "Paper",
    "Scissors",
    "this",
    "that",
    "lorem",
    "ipsum",
    "dolor",
    "sit",
    "amet",
    "sleep",
    "eat",
    "very",
    "nice",
    "lolo",
    "popo",
  ];
  var thing = things[Math.floor(Math.random() * things.length)];
  return thing;
}
var gMeme;
var glastLoc;
function updateMeme(meme) {
  gMeme = meme;
}

function getRandomId(length) {
  var txt = "";
  var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < length; i++) {
    txt += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return txt;
}

function findCurrMeme(arr, id) {
  var x = arr.find((item) => {
    return item.selectedImgId === id;
  });
  return x;
}
function moveLine(dx, dy) {
  var currLine = gMeme.lines[gMeme.selectedLineIdx];
  currLine.location.x -= dx;
  currLine.location.y -= dy;
  currLine.align = "";
}
function setImg(id, x) {
  if (!id && !x) {
    gMeme = createMeme(getRandomImg());
    renderMeme(true, true);
    return;
  }
  if (!x) {
    console.log("here");
    gMeme = findCurrMeme(gMemes, id);
    console.log("gMeme", gMeme);
    renderMeme(true, true);
    return;
  } else {
    gMeme = findSavedMeme(x);
    renderMeme(true, true);
    return;
  }
}

function getRandomImg() {
  let idx = getRandomInt(gImgs.length);
  return gImgs[idx];
}

function findSavedMeme(x) {
  let memesArr = loadFromStorage("savedMemes");
  let meme = memesArr.find((item) => {
    return item.id === x;
  });
  return meme;
}
function getRandomMemeId() {
  var length = gImgs.length;
  var num = getRandomInt(length);
  var obj = gImgs.find((item) => {
    return item.id === num;
  });
  return obj.id;
}
function getRandomInt(x) {
  var res = Math.floor(Math.random() * x);
  res === 0 ? (res = getRandomInt(x)) : (res = res);
  return res;
}
function getMeme() {
  return gMeme;
}
function getIMgs() {
  return gImgs;
}
function deleteLine() {
  gMeme.lines.splice(gMeme.selectedLineIdx, 1);
}
function addTextLine() {
  var line = createRandomLine();
  if (line) {
    gMeme.lines.push(line);
    gMeme.selectedLineIdx = gMeme.lines.length - 1;
  }
}
function setStrokeColor() {}
function getMemeImg() {
  var memeImg = gImgs.find((item) => {
    return item.id === gMeme.selectedImgId;
  });
  return memeImg;
}
function setLineTxt(txt) {
  gMeme.lines[gMeme.selectedLineIdx].txt = txt;
}
function setLineColor(color) {
  gMeme.lines[gMeme.selectedLineIdx].color = color;
}
function setFont(val) {
  let meme = getMeme();
  let line = meme.lines[meme.selectedLineIdx];
  let num = line.size;
  if (val === "increase") {
    num += 10;
    if (num > 80) num = 80;
    line.size = num;
  } else if (val === "decrease") {
    num -= 10;
    if (num < 25) num = 25;
    line.size = num;
  }
}
function createRandomLine(obj) {
  var loc = glastLoc
    ? { x: glastLoc.x, y: glastLoc.y + 50 }
    : { x: 150, y: 200 };
  glastLoc = loc;
  if (gMeme.lines[false]) {
    gMeme.limnes.splice(false, 1);
  }
  var line;
  if (obj) {
    var { txt, color, id, location, size } = obj;
    line = {
      txt,
      color,
      id,
      location,
      size,
    };
  } else {
    line = {
      txt: "text",
      color: "red",
      id: getRandomId(5),
      location: loc,
      size: 60,
    };
    return line;
  }
}

function getetCurrMemeLine() {
  return gMeme.lines[gMeme.selectedLineIdx];
}

function getMemeLines() {
  return gMeme.lines;
}
function switchLine() {
  var idx = gMeme.selectedLineIdx;
  var length = gMeme.lines.length;
  var line;
  if (idx + 1 < length) {
    line = gMeme.lines[idx + 1];
    gMeme.selectedLineIdx = idx + 1;
  } else {
    line = gMeme.lines[0];
    gMeme.selectedLineIdx = 0;
  }
  return line;
}
function checkMeme(obj) {
  var x = gMeme.lines.findIndex((item) => {
    return item.id === obj.id;
  });
  if (gMeme.selectedLineIdx === x) return true;
  else return false;
}

function onRenderStickers() {
  let startIdx = gStickerPageIdx * gStickerPageSize;
  let stickersArr = gStickers.slice(startIdx, startIdx + gStickerPageSize);
  let container = document.querySelector(".stickers-box");
  let innerHtmls = "";
  stickersArr.forEach((item) => {
    innerHtmls += `<div class="sticker" onclick="setStickerLine('${item}')">${item}</div>`;
  });
  container.innerHTML = innerHtmls;
}

function setNextPage() {
  gStickerPageIdx++;
  if (gStickerPageIdx * gStickerPageSize >= gStickers.length) {
    gStickerPageIdx = 0;
  }
  onRenderStickers();
}

function setPrevPage() {
  gStickerPageIdx--;
  if (gStickerPageIdx * gStickerPageSize <= 0) {
    gStickerPageIdx = 0;
  }
  onRenderStickers();
}
