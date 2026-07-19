const canvas = document.getElementById('canvas');
let ctx = canvas.getContext("2d");

canvas.width = screen.width;
canvas.height = screen.height / 2;

let currentTool = "brush";
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
  if(document.getElementById("fill-toggle").classList.contains("active")) {
    ctx.fillStyle = 'rgb(' + red + ', ' + green + ', ' + blue + ')';
	  //ctx.fill();
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  document.getElementById("fill-toggle").checked = false;
}

/*let fillShape = () => {
	if(document.getElementById("fill-toggle).checked) {
		ctx.beginPath();
		ctx.moveTo(75, 50);
		ctx.lineTo(100, 100);
		ctx.lineTo(50, 100);
		ctx.closePath();
		
		ctx.fillStyle = 'rgb(' + red + ', ' + green + ', ' + blue + ')';
		ctx.fill();
	}
}*/

/* Create brush tools */
const brushBtn = document.getElementById("brush-btn");
const eraseBtn = document.getElementById("erase-btn");
const fillBtn = document.getElementById("fill-btn");

brushBtn.addEventListener('click', () => {
  document.querySelectorAll('.toggle-btn').forEach(element => {
    element.classList.remove('active');
  });
  brushBtn.classList.toggle("active");
  currentTool = "brush"
})

eraseBtn.addEventListener('click', () => {
  document.querySelectorAll('.toggle-btn').forEach(element => {
    element.classList.remove('active');
  });
  eraseBtn.classList.toggle("active");
  currentTool = "erase"
})

fillBtn.addEventListener('click', () => {
  document.querySelectorAll('.toggle-btn').forEach(element => {
    element.classList.remove('active');
  });
  fillBtn.classList.toggle("active");
  currentTool = "fill"
})

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

    if(currentTool == "erase") {
      ctx.beginPath();
      ctx.moveTo(coord.x, coord.y);

      getMousePos(e);

      ctx.lineTo(coord.x, coord.y);
      ctx.strokeStyle = "#FFF";
      ctx.lineCap = "round";
      ctx.lineWidth = document.getElementById("width-picker").value;
      ctx.stroke();
    } else if (currentTool == "brush") {
      ctx.beginPath();
      ctx.moveTo(coord.x, coord.y);

      getMousePos(e);

      ctx.lineTo(coord.x, coord.y);
      ctx.strokeStyle = 'rgb(' + red + ', ' + green + ', ' + blue + ')';
      ctx.lineCap = "round";
      ctx.lineWidth = document.getElementById("width-picker").value;
      ctx.stroke();
    } else if (currentTool == "fill") {
      fillCanvas();
    }

    /*if(document.getElementById("erase-toggle").checked) {
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
    }*/

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
  document.getElementById("red-value").innerHTML = red;
  document.getElementById("green-value").innerHTML = green;
  document.getElementById("blue-value").innerHTML = blue;
  document.getElementById("preview").style.backgroundColor = 'rgb(' + red + ',' + green + ',' + blue + ')';
}

canvas.addEventListener("touchstart", startPainting, function (e) {
				mousePos = getTouchPos(canvas, e);
				var touch = e.touches[0];
				var mouseEvent = new MouseEvent("mousedown", {
					clientX: touch.clientX,
					clientY: touch.clientY
				});
				canvas.dispatchEvent(mouseEvent);
			}, false);

canvas.addEventListener("touchend", function (e) {
				var mouseEvent = new MouseEvent("mouseup", {});
				canvas.dispatchEvent(mouseEvent);
			}, false);

canvas.addEventListener("touchmove", function (e) {
				var touch = e.touches[0];
				var mouseEvent = new MouseEvent("mousemove", {
					clientX: touch.clientX,
					clientY: touch.clientY
				});
				canvas.dispatchEvent(mouseEvent);
			}, false);

canvas.addEventListener("click", fillCanvas);

canvas.addEventListener("mousedown", startPainting);

canvas.addEventListener("mouseup", stopPainting);

canvas.addEventListener("mousemove", painting);

document.getElementById('clear').addEventListener('click', clear);
