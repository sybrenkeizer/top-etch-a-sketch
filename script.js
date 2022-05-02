// Gather elements
const gridContainer = document.querySelector('.grid__container')
const gridElement = document.querySelector('.grid__element')

// Determine grid size
const gridSize = prompt('Enter a value not more than 100 to determine the grid size of your sketch pad', "");
if (gridSize > 100) {
  alert("Enter a value not more than 100");
}


// Set grid container according to input and fill with grid elements
function setGrid(value) {
  gridContainer.style.gridTemplateColumns = `repeat(${value}, 1fr)`;
  gridContainer.style.gridTemplateRows = `repeat(${value}, 1fr)`;

  for (let i = 0; i < value * value; i++) {
    const gridElement = document.createElement('div');
    gridElement.classList.add('grid__element');
    gridElement.addEventListener('mouseover', draw);
    gridElement.addEventListener('mousedown', draw);
    gridContainer.appendChild(gridElement);
  }
}

// Store setting mouse down and mouse up
let mouseIsDown = false;
document.body.onmousedown = () => (mouseIsDown = true);
document.body.onmouseup = () => (mouseIsDown = false);

// Add color to targetted grid element only when mouse is is pressed down
function draw(event) {
  if (event.type === 'mouseover' && !mouseIsDown) return
  event.target.style.backgroundColor = '#000';
}




setGrid(gridSize)
