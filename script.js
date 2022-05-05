// Gather elements
const gridContainer = document.querySelector('.grid__container');
const customColorInput = document.querySelector('.custom-color__input');
const canvasColorInput = document.querySelector('.canvas-color__input');
const randomColorInput = document.querySelector('.random-color__input');
const eraserBtn = document.querySelector('.eraser__input');
const clearFieldBtn = document.querySelector('.clear-field__btn');
const gridSizerDescription = document.querySelector('.grid-sizer__description');
const gridSizerInput = document.querySelector('.grid-sizer__input');
const showGridBtn = document.querySelector('.show-grid-btn');
const saveBtn = document.querySelector('.save-btn');
const buttons = document.querySelectorAll('.btn');


window.onload = function() {
  setGrid(48);
}

// Store setting mouse down and mouse up
let mouseIsDown = false;
document.body.onmousedown = () => (mouseIsDown = true);
document.body.onmouseup = () => (mouseIsDown = false);


// Activate/deactivate button random colors
let randomColorInputActive = false;
randomColorInput.addEventListener('click', function() {
  randomColorInput.classList.toggle('btn-active');
  if (randomColorInputActive === false) {
    randomColorInputActive = true;
  } else if (randomColorInputActive === true) {
    randomColorInputActive = false;
  }
})


// Activate/deactivate button eraser
let eraserBtnActive = false;
eraserBtn.addEventListener('click', function() {
  eraserBtn.classList.toggle('btn-active');
  if (eraserBtnActive === false) {
    eraserBtnActive = true;
  } else if (eraserBtnActive === true) {
    eraserBtnActive = false
  }
})

// Clear whole grid:
// 1) Remove all grid elements
// 2) Add new grid elements according to grid range input
clearFieldBtn.addEventListener('click', function() {
  emptyGrid()
  setGrid(gridSizerInput.value)
})


let showGridBtnActive = false;
showGridBtn.addEventListener('click', function() {
  showGridBtn.classList.toggle('btn-active');
  if (showGridBtnActive === false) {
    showGridBtnActive = true;
  } else if (showGridBtnActive === true) {
    showGridBtnActive = false;
  }
})


// Set grid container template according to input
function setGrid(value) {
  gridContainer.style.gridTemplateColumns = `repeat(${value}, 1fr)`;
  gridContainer.style.gridTemplateRows = `repeat(${value}, 1fr)`;

  // Create grid elements according to input
  // Toggle grid on showGridBtn (de)activation
  // Sensetize grid elements to Draw
  // Append grid elements to grid container
  for (let i = 0; i < value * value; i++) {
    const gridElement = document.createElement('div');

    // showGridBtn.addEventListener('click', function() {
    //   showGridBtn.classList.toggle('btn-active');
    //   gridElement.classList.toggle('grid__element');
    // })

    if (showGridBtnActive === true) {
      gridElement.classList.add('grid__element');
    } else if (showGridBtnActive === false) {
      gridElement.classList.remove('grid__element');

    }

    gridElement.addEventListener('mouseover', draw);
    gridElement.addEventListener('mousedown', draw);
    gridContainer.appendChild(gridElement);
  }
}



// Remove all children grid container
function emptyGrid() {
  while (gridContainer.firstChild) {
    gridContainer.removeChild(gridContainer.firstChild)
  }
}



// Add color to targetted grid element only when mouse is is pressed down
function draw(event) {
  if (event.type === 'mouseover' && !mouseIsDown) return
  event.target.style.backgroundColor = customColorInput.value;
  if (eraserBtnActive === true) {
    event.target.style.backgroundColor = '';
  } else if (randomColorInputActive === true) {
    const randomR = Math.floor(Math.random() * 256);
    const randomG = Math.floor(Math.random() * 256);
    const randomB = Math.floor(Math.random() * 256);
    const randomA = Math.floor(Math.random() * 8 + 3);
    event.target.style.backgroundColor = `rgba(${randomR}, ${randomG}, ${randomB}, 0.${randomA})`
  }
}



// Set grid background according to input
canvasColorInput.addEventListener('input', () => gridContainer.style.backgroundColor = canvasColorInput.value)



// On input grid size range:
// Remove all children grid container
// Add children to grid container according newly specified range input
// Update grid range description according newly specified range input
gridSizerInput.addEventListener('input', function() {
  emptyGrid()
  setGrid(gridSizerInput.value)
  gridSizerDescription.innerHTML = `Grid size ${gridSizerInput.value} x ${gridSizerInput.value}`;
})
