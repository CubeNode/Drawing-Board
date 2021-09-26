const canvas = document.getElementById('canvas');
let ctx = canvas.getContext("2d");

canvas.width = screen.width / 2;
canvas.height = screen.height / 2;

let paint = false,
coord = {x:0, y:0},
color = '#000',
width = 1;

let red = 0,
green = 0,
blue = 0;

let clear = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

let fillCanvas = () => {
  if(document.getElementById("fill-toggle").checked) {
    ctx.fillStyle = 'rgb(' + red + ', ' + green + ', ' + blue + ')';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  document.getElementById("fill-toggle").checked = false;
}

let startPainting = (e) => {
  paint = true;
  getMousePos(e);

  e.preventDefault();
}

let stopPainting = (e) => {
  paint = false;

  e.preventDefault();
}

let painting = (e) => {

  if(paint){

    if(document.getElementById("erase-toggle").checked) {
      ctx.beginPath();
      ctx.moveTo(coord.x, coord.y);

      getMousePos(e);

      ctx.lineTo(coord.x, coord.y);
      ctx.strokeStyle = "#FFF";
      ctx.lineCap = "round";
      ctx.lineWidth = document.getElementById("width-picker").value;
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.moveTo(coord.x, coord.y);

      getMousePos(e);

      ctx.lineTo(coord.x, coord.y);
      ctx.strokeStyle = 'rgb(' + red + ', ' + green + ', ' + blue + ')';
      ctx.lineCap = "round";
      ctx.lineWidth = document.getElementById("width-picker").value;
      ctx.stroke();
    }

  }

  e.preventDefault();
}

let getMousePos = (e) => {
  coord.x = e.clientX - canvas.offsetLeft;
  coord.y = e.clientY - canvas.offsetTop;

  e.preventDefault();
}

let updateVal = (val) => {
  let label = document.getElementById('width-label');

  label.innerHTML = "Width: " + val;
}

let colors = () => {
  red = document.getElementById("red").value;
  green = document.getElementById("green").value;
  blue = document.getElementById("blue").value;
  document.getElementById("output").innerHTML = 'rgb(' + red + ',' + green + ',' + blue + ')';
  document.getElementById("preview").style.backgroundColor = 'rgb(' + red + ',' + green + ',' + blue + ')';
}

canvas.addEventListener("touchstart", (e) => {
  coord = getTouchPos(canvas, e);
  let touch = e.touches[0];
  let mouseEvent = new MouseEvent("mousedown", {
    clientX: touch.clientX,
    clientY: touch.clientY
  });
  canvas.dispatchEvent(mouseEvent);
  e.preventDefault();
}, false);

canvas.addEventListener("touchend", (e) => {
  let mouseEvent = new MouseEvent("mouseup", {});
  canvas.dispatchEvent(mouseEvent);
  e.preventDefault();
}, false);

canvas.addEventListener("touchmove", (e) => {
  let touch = e.touches[0];
  let mouseEvent = new MouseEvent("mousemove", {
    clientX: touch.clientX,
    clientY: touch.clientY
  });
  canvas.dispatchEvent(mouseEvent);
  e.preventDefault();
}, false);

canvas.addEventListener("click", fillCanvas);

canvas.addEventListener("mousedown", startPainting);

canvas.addEventListener("mouseup", stopPainting);

canvas.addEventListener("mousemove", painting);
