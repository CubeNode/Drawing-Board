const canvas = document.getElementById('canvas');
let ctx = canvas.getContext("2d");

canvas.width = screen.width / 2;
canvas.height = screen.height / 2;

let paint = false,
coord = {x:0, y:0},
color = '#000',
width = 1;

let erase = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

let startPainting = (e) => {
  paint = true;
  getMousePos(e);
}

let stopPainting = () => {
  paint = false;
}

let painting = (e) => {
  if(paint){

    ctx.beginPath();
    ctx.moveTo(coord.x, coord.y);

    getMousePos(e);

    ctx.lineTo(coord.x, coord.y);
    ctx.strokeStyle = document.getElementById("color-picker").value;
    ctx.lineCap = "round";
    ctx.lineWidth = document.getElementById("width-picker").value;
    ctx.stroke();
  }

}

let getMousePos = (e) => {
  coord.x = e.clientX - canvas.offsetLeft;
  coord.y = e.clientY - canvas.offsetTop;
}

let updateVal = (val) => {
  let label = document.getElementById('width-label');

  label.innerHTML = "Width: " + val;
}

canvas.addEventListener("mousedown", startPainting);

canvas.addEventListener("mouseup", stopPainting);

canvas.addEventListener("mousemove", painting);
