// Gather elements
const gridContainer = document.querySelector('.grid__container');
const customColorInput = document.querySelector('.custom-color__input');
const customColorRadio = document.querySelector('.custom-color__radio');
const canvasColorInput = document.querySelector('.canvas-color__input');
const randomColorInput = document.querySelector('.random-color__input');
const darkGradientInput = document.querySelector('.dark-gradient__input');
const lightGradientInput = document.querySelector('.light-gradient__input');
const eraserBtn = document.querySelector('.eraser__input');
const clearCanvasBtn = document.querySelector('.clear-field__btn');
const gridSizerDescription = document.querySelector('.grid-sizer__description');
const gridInputRange = document.querySelector('.grid-sizer__input');
const showGridBtn = document.querySelector('.toggle-grid__input');
const saveBtn = document.querySelector('.save-btn');
const buttons = document.querySelectorAll('.btn');
const customColorDescription = document.querySelector('.custom-color__description');
const canvasColorDescription = document.querySelector('.canvas-color__description');
const drawRadioBoxes = document.querySelectorAll('.draw-radio');
const radioDescriptions = document.querySelectorAll('.radio__description');
const canvasColorRadio = document.querySelector('.canvas-color__radio');


window.onload = function() {
  setGrid(currentSize);
}


// Default options
const DEFAULT_OPTION = 'customColor';
const DEFAULT_SIZE = 50;


// Main settings
let currentDrawOption = DEFAULT_OPTION;
let currentSize = DEFAULT_SIZE;
let mouseIsDown = false;


// Main functions
function setCurrentDrawOption(newOption) {
  currentDrawOption = newOption;
}
function setCurrentSize(newSize) {
  currentSize = newSize;
}


// Store interactions
customColorInput.onclick = () => setCurrentDrawOption('customColor');
customColorDescription.onclick = () => setCurrentDrawOption('customColor')
randomColorInput.onclick = () => setCurrentDrawOption('randomColor');
darkGradientInput.onclick = () => setCurrentDrawOption('darkGradient');
lightGradientInput.onclick = () => setCurrentDrawOption('lightGradient');
eraserBtn.onclick = () => setCurrentDrawOption('eraser');
document.body.onmousedown = () => (mouseIsDown = true);
document.body.onmouseup = () => (mouseIsDown = false);


// Drawing function
function draw(event) {
  if (event.type === 'mouseover' && !mouseIsDown) return
  switch(currentDrawOption) {
    case 'customColor':
      customColor();
      break;
    case 'randomColor':
      randomColor();
      break;
    case 'darkGradient':
      darkGradient();
      break;
    case 'lightGradien':
      lightGradient();
      break;
    case 'eraser':
      eraser();
      break;
  }
}


// Drawing options
function customColor() {
  event.target.style.backgroundColor = customColorInput.value;
  customColorInput.addEventListener('input', () => {
    customColorRadio.checked = true;
  })
}
function randomColor() {
  const randomR = Math.floor(Math.random() * 256);
  const randomG = Math.floor(Math.random() * 256);
  const randomB = Math.floor(Math.random() * 256);
  const randomA = Math.floor(Math.random() * 8 + 3);
  event.target.style.backgroundColor = `rgba(${randomR}, ${randomG}, ${randomB}, 0.${randomA})`
}
function darkGradient() {
  // not working yet
}
function lightGradient() {
  // not working yet
}
function eraser() {
  event.target.style.backgroundColor = canvasColorInput.value;
}


// Canvas options
canvasColorInput.addEventListener('input', () => {
  gridContainer.style.backgroundColor = canvasColorInput.value;
  canvasColorRadio.checked = true;
})
// show grid option


let showGridBtnActive = false;
showGridBtn.addEventListener('click', function() {
  showGridBtn.classList.toggle('btn-active');
  showGridBtnActive === false ? showGridBtnActive = true : false;
})


gridInputRange.addEventListener('input', () => {
  setGrid(gridInputRange.value);
  gridSizerDescription.innerHTML = `Grid size ${gridInputRange.value} x ${gridInputRange.value}`;
})
clearCanvasBtn.addEventListener('click', () => {
  clearCanvas();
  setGrid(gridInputRange.value);
})


// Sub functions
function clearCanvas() {
  while (gridContainer.firstChild) {
    gridContainer.removeChild(gridContainer.firstChild)
  }
}
function setGrid(value) {
  gridContainer.style.gridTemplateColumns = `repeat(${value}, 1fr)`;
  gridContainer.style.gridTemplateRows = `repeat(${value}, 1fr)`;
  for (let i = 0; i < value * value; i++) {
    let gridElement = document.createElement('div');
    gridElement.addEventListener('mouseover', draw);
    gridElement.addEventListener('mousedown', draw);
    gridContainer.appendChild(gridElement);
  }
}
