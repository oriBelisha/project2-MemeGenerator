"use strict";

function init() {
  setGallery();
  setClasses();
  document.querySelector(".flexible").style.visibility = "visible";
  initMemeController();
  onRenderStickers();
}
function setGallery(x) {
  if (x) {
    console.log("bananana");
    saveTotorage("images", gImgs);
    return;
  }
  let imgs = loadFromStorage("images");
  if (!imgs) imgs = gImgs;
  else gImgs = imgs;
  saveTotorage("images", imgs);

  if (!x) {
    renderGallery(gImgs);
  }
}
function onToggleMenu() {
  let elmenu = document.querySelector(".header-nav");
  console.log(elmenu);
  if (
    !elmenu.style.transform ||
    elmenu.style.transform === "none" ||
    (elmenu.style.transform && document.body.style.direction === "rtl")
  ) {
    if (document.body.style.direction === "rtl") {
      elmenu.classList.toggle("rtl-menu-transform");
    } else elmenu.style.transform = "translate(-220%, 0%)";
  } else elmenu.style.transform = "none";
}

function toggleModal() {
  let modal = document.querySelector(".about-modal");
  modal.classList.toggle("hide");
}

function setClasses() {
  document.querySelector(".meme-generator").classList.add("display-none");
  document.querySelector(".gallery-container").classList.add("grid");
}
function onSetLang(el) {
  setLang(el.innerText.toLowerCase());
  doTrans();
  adjustBrgrMenu();
}
function adjustBrgrMenu() {
  if (window.innerWidth <= 650) {
    if (document.body.style.direction) {
      let menu = document.querySelector(".header-nav");
      let x = document.querySelector(".x");
      menu.classList.toggle("rtl-menu");
      if (menu.style.transform) {
        console.log("transform?");
        x.classList.toggle("rtl-x");
        menu.classList.toggle("rtl-menu-transform");
      }
      console.log(menu);
    }
  }
}

function renderGallery(arr) {
  document.querySelector(".flexible").style.visibility = "visible";
  if (checkIfMemeGen()) {
    toggleMemeGenerator();
    toggleGallery();
  }
  let imgsArr;
  if (arr) imgsArr = arr;
  else imgsArr = getIMgs();
  let elGallery = document.querySelector(".gallery-container");
  let innerHtmls = "";
  imgsArr.forEach((item) => {
    innerHtmls += `<img onclick="onImgSelect(this)" class="grid-item" data-id=${item.id} src="${item.url}"  alt="">`;
  });
  elGallery.innerHTML = innerHtmls;
}
function toggleSearchBar() {
  console.log("zibi ze lo oved");
  let elSearch = document.querySelector(".search-container");
  elSearch.classList.toggle("hide");
}
function onFilterGallery(el) {
  let elInput;
  if (!el) {
    elInput = document.getElementById("search-bar");
  } else elInput = el;
  console.log(elInput);
  console.log(elInput.value);
  filterGallery(elInput.value);
}
function onImgSelect(el, x) {
  toggleGallery();
  toggleMemeGenerator();
  document.querySelector(".flexible").style.visibility = "hidden";
  if (el) {
    let id = +el.dataset.id;
    setImg(id, x);
  } else setImg();
}
function onUploadPhoto(ev, el) {
  console.log("el", el);
  console.dir(el);
  console.log("ev", ev);
  console.dir(ev);
  const file = ev.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (ev) {
      const imageUrl = ev.target.result;
      addImg(imageUrl);
      setGallery(true);

      console.log("Image URL:", imageUrl);
    };
    reader.readAsDataURL(file);
  }
}
function loadImageFromInput(ev, onImageReady) {
  var reader = new FileReader();
  reader.readAsDataURL(ev.target.files[0]);

  reader.onload = (ev) => {
    console.log("onload");
    var img = new Image();
    console.log("img", img);
    img.onload = onImageReady.bind(null, img.src);
    img.src = ev.target.result;
    gImg = img;
    console.log("gimg", gImg);
  };
}
function toggleGallery() {
  let elGallery = document.querySelector(".gallery-container");
  elGallery.classList.toggle("grid");
  elGallery.classList.toggle("display-none");
}
function renderSavedMemes() {
  if (checkIfMemeGen()) {
    toggleMemeGenerator();
    toggleGallery();
  }
  let elGallery = document.querySelector(".gallery-container");
  elGallery.innerHTML = "";
  let memesArr = loadFromStorage("savedMemes");
  let innerHtmls = "";
  memesArr.forEach((item) => {
    innerHtmls += `<img onclick="onImgSelect(this,${item.id})" class="grid-item" data-id=${item.selectedImgId} src="${item.preview}"  alt="" data-meme=${item}>`;
  });
  elGallery.innerHTML = innerHtmls;
}
function onSavedMemeSelect(el) {}
