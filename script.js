const doc = document
const canvas = doc.querySelector ('#canv')
const ctx = canvas.getContext ('2d')
const xCoordBlock = doc.querySelector ('#x-coord')
const yCoordBlock = doc.querySelector ('#y-coord')


const system = {
    width: canvas.getAttribute ('width'),
    height: canvas.getAttribute ('height'),
    currentTool: '',
    currentColor: 'black',
    brushSize: 5
}

function renderSystem (sysObj, elem, action) {
    sysObj [elem] = action
}

function getCoordinates (evt) {
    //берем коорд курсора
    xCoordBlock.innerText = evt.offsetX
    yCoordBlock.innerText = evt.offsetY
}


function clicker (evt) {
// для элементов "инструменты" (tools-button)
    if (evt.target.classList.contains ('tool-button')) {
        renderSystem (system, 'currentTool', evt.target.dataset['name'])
    }
}

function inputer (evt) {
// для элементов "инструменты" (select-)
    if (evt.target.id === 'select-size') {
        renderSystem (system, 'brushSize', evt.target.value)
    }
    if (evt.target.id === 'select-color') {
        renderSystem (system, 'currentColor', evt.target.value)
    }
}

//drawing functions
function startDraw (evt) {
    if (system.currentTool) {
        if (system.currentTool === 'brush') {
            drawLine (evt)
        }
    } else {
        alert ('choose tool')
    }
}

function endDraw () {
    canvas.onmousemove = null
}


function drawLine (evt) {
    canvas.onmousemove = function (evt) {
        ctx.fillStyle = system.currentColor
        ctx.fillRect (+xCoordBlock.innerText, +yCoordBlock.innerText, system.brushSize, system.brushSize)
    }
}

function draw() {
  var canvas = document.getElementById('canvas');
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');

    ctx.fillRect(225,225,300,300);
    ctx.clearRect(245,245,260,260);
    ctx.strokeRect(150,150,150,150);
  }
}

function draw() {
  var canvas = document.getElementById('canvas');
  if (canvas.getContext){
    var ctx = canvas.getContext('2d');

    // Filled triangle
    ctx.beginPath();
    ctx.moveTo(25,25);
    ctx.lineTo(105,25);
    ctx.lineTo(25,105);
    ctx.fill();

    // Stroked triangle
    ctx.beginPath();
    ctx.moveTo(125,125);
    ctx.lineTo(125,45);
    ctx.lineTo(45,125);
    ctx.closePath();
    ctx.stroke();
  }
}


//listeners

doc.addEventListener ('input', inputer)
doc.addEventListener ('click', clicker)

canvas.addEventListener ('mousemove', getCoordinates)
canvas.addEventListener ('mousedown', startDraw)
canvas.addEventListener ('mouseup', endDraw)

