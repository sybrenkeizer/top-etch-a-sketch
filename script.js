// Gather elements
const gridContainer = document.querySelector('.grid__container');
const customColorInput = document.querySelector('.custom-color__input');
const customColorRadio = document.querySelector('.custom-color__radio');
const customColorDescription = document.querySelector('.custom-color__description');
const canvasColorInput = document.querySelector('.canvas-color__input');
const canvasColorRadio = document.querySelector('.canvas-color__radio');
const randomColorInput = document.querySelector('.random-color__input');
const darkGradientInput = document.querySelector('.dark-gradient__input');
const lightGradientInput = document.querySelector('.light-gradient__input');
const eraserBtn = document.querySelector('.eraser__input');
const clearCanvasBtn = document.querySelector('.clear-field__btn');
const gridSizerDescription = document.querySelector('.grid-sizer__description');
const gridInputRange = document.querySelector('.grid-sizer__input');
const showGridBtn = document.querySelector('.toggle-grid__input');

const expandOptionsBtn = document.querySelector('.expand__item__label');
const settingsDrawing = document.querySelector('.fieldset__container--drawing');
const showMoreOptions = document.querySelectorAll('.fieldset__item--secondary');
const arrowRight = document.querySelector('.fa-circle-arrow-right');
const arrowUp = document.querySelector('.fa-circle-arrow-up');
const expandOptionsLabel = document.querySelector('.expand__item__label');



// Default options
const DEFAULT_OPTION = 'customColor';
const DEFAULT_SIZE = 50;
const DEFAULT_CANVAS_COLOR = 'rgb(250, 250, 250)';



// Main settings
let currentDrawOption = DEFAULT_OPTION;
let currentSize = DEFAULT_SIZE;
let currentCanvasColor = DEFAULT_CANVAS_COLOR;
let mouseIsDown = false;
let gridIsVisible = false;



// Main functions
function setCurrentDrawOption(newOption) {
  currentDrawOption = newOption;
}

function setCurrentSize(newSize) {
  currentSize = newSize;
}

function setCanvasColor(newCanvasColor) {
  currentCanvasColor = newCanvasColor;
}

window.onload = function() {
  setGrid(currentSize);
  gridContainer.style.backgroundColor = currentCanvasColor
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
    case 'customColor': customColor(); break;
    case 'randomColor': randomColor(); break;
    case 'darkGradient': darkGradient(); break;
    case 'lightGradient': lightGradient(); break;
    case 'eraser': eraser();break;
  }
}



// Drawing options
function customColor() {
  event.target.style.backgroundColor = customColorInput.value;
}

customColorInput.addEventListener('input', () => {
  customColorRadio.checked = true;
})

function randomColor() {
  const randomR = Math.floor(Math.random() * 256);
  const randomG = Math.floor(Math.random() * 256);
  const randomB = Math.floor(Math.random() * 256);
  event.target.style.backgroundColor = `rgba(${randomR}, ${randomG}, ${randomB})`;
}

function eraser() {
  event.target.style.backgroundColor = '';
}

/////////////////////////////////////////////////////////////////////

expandOptionsBtn.addEventListener('click', () => {
  if (arrowUp.classList.contains('remove-arrow')) {
    arrowRight.classList.toggle('remove-arrow');
    arrowUp.classList.toggle('remove-arrow');
  } else if (arrowRight.classList.contains('remove-arrow')) {
    arrowRight.classList.toggle('remove-arrow');
    arrowUp.classList.toggle('remove-arrow');
  }
  if (arrowRight.classList.contains('remove-arrow')) {
    expandOptionsLabel.textContent = "Less Options";
  } else {
    expandOptionsLabel.textContent = "More Options";
  }

  showMoreOptions.forEach(showOption => {
    showOption.classList.toggle('fieldset__item--secondary');
  })
})








/////////////////////////////////////////////////////////////////////

function darkGradient() {
  let targetColor = event.target.style.backgroundColor;
  let targetColorCanvas = event.target.parentElement.style.backgroundColor;

  if (targetColor === '') {
    targetColor = targetColorCanvas
  }

  let hslValue = convertRgbToHsl(targetColor);
  let regexHsl = /hsl\((\d{1,3}), (\d{1,2}%), (\d{1,2}%)\)/;
  let match = regexHsl.exec(hslValue);
  let h = match[1];
  let s = match[2];
  let l = match[3];
  let luminaceNr = Number(l.replace(/%/, ''));
  let reducedLuminace

  if (luminaceNr > 0) {
    if (luminaceNr === 1) {
      reducedLuminace = luminaceNr - 1;
    } else {
      reducedLuminace = luminaceNr - 2;
    }
  } else if (luminaceNr <= 0) {
    reducedLuminace = luminaceNr;
  }

  newHslValue = `hsl(${h}, ${s}, ${reducedLuminace}%)`;
  event.target.style.backgroundColor = newHslValue;
}

function lightGradient() {
  let targetColor = event.target.style.backgroundColor;
  let targetColorCanvas = event.target.parentElement.style.backgroundColor;

  if (targetColor === '') {
    targetColor = targetColorCanvas
  }

  let hslValue = convertRgbToHsl(targetColor);
  let regexHsl = /hsl\((\d{1,3}), (\d{1,2}%), (\d{1,2}%)\)/;
  let match = regexHsl.exec(hslValue);
  let h = match[1];
  let s = match[2];
  let l = match[3];
  let luminaceNr = Number(l.replace(/%/, ''));
  let increasedLuminace

  if (luminaceNr < 100) {
    if (luminaceNr === 99) {
      increasedLuminace = luminaceNr + 1;
    } else {
      increasedLuminace = luminaceNr + 2;
    }
  } else if (luminaceNr => 100) {
    increasedLuminace = luminaceNr;
  }

  newHslValue = `hsl(${h}, ${s}, ${increasedLuminace}%)`;
  event.target.style.backgroundColor = newHslValue;
}





// Canvas options
canvasColorInput.addEventListener('input', () => {
  gridContainer.style.backgroundColor = canvasColorInput.value;
  canvasColorRadio.checked = true;
})

showGridBtn.addEventListener('click', () => {
  if (showGridBtn.checked) {
    gridIsVisible = true;
  } else if (!showGridBtn.checked) {
    gridIsVisible = false;
  }
  clearCanvas()
  setGrid(gridInputRange.value);
})

gridInputRange.addEventListener('input', () => {
  clearCanvas();
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
    // gridElement.style.backgroundColor = canvasColorInput.value;
    gridElement.addEventListener('mouseover', draw);
    gridElement.addEventListener('mousedown', draw);

    if (gridIsVisible === true) {
      gridElement.classList.add('grid-show');
    } else if (gridIsVisible === false) {
      gridElement.classList.remove('grid-show');
    }

    gridContainer.appendChild(gridElement);
  }
}

function convertRgbToHsl(rgbValue) {
  // Separate RGB values
  const regex = /rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/;
  const match = regex.exec(rgbValue);
  let r = match[1];
  let g = match[2];
  let b = match[3];

  // Convert RGB values to a range of 0-1 with 2 decimals
  (r /= 255).toFixed(2);
  (g /= 255).toFixed(2);
  (b /= 255).toFixed(2);

  // Find the minimum and maximum values
  let max = Math.max(r, g, b);
  let min = Math.min(r, g, b);

  // Calculate luminace
  let l = ((max + min) /  2).toFixed(2);
  let s;
  let h;

  // Calculate Saturation
  if (max === min) {
    s = 0;
    h = 0;
  } else {
    if (l < 0.5) {
      s = ((max - min) / (max + min)).toFixed(2);
    } else {
      s = ((max - min) / (2 - max - min)).toFixed(2);
    }
    // Calculate hue
    switch(max) {
      case r: h = (g - b) / (max - min) + (g < b ? 6 : 0); break;
      case g: h = (b - r) / (max - min) + 2; break;
      case b: h = (r - g) / (max - min) + 4; break;
    }
  }

  h *= 60;

  // Make HSL values suitable for CSS
  h = Math.round(h);
  s = Math.round(s * 100);
  l = Math.round(l * 100);

  let hslValue = `hsl(${h}, ${s}%, ${l}%)`
  return hslValue;
}
