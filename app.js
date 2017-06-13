const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');

canvas.width= window.innerWidth;
canvas.height= window.innerHeight;

ctx.strokeStyle = '#BADASS';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 100;
//Below we mess with blending similar to Photoshop. There are a multitude of options. Google for a list of more.
//ctx.globalCompositeOperation = 'overlay';


let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

function draw(e){
  if(!isDrawing) return; //stops function from running when the mouse isn't down
  console.log(e);
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  //Start from
  ctx.beginPath();
  //Go to
  ctx.moveTo(lastX,lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  //lastX= e.offsetX;
  //lastY= e.offsetY;
  //Let's destructure the variables lastX and lastY and simplify the process
  [lastX,lastY]=[e.offsetX,e.offsetY];
  //Now, we're going to iteratively add 1 to the Hue value with each instance of mousemove, thereby rotating through a rainbow of colors.
  hue++;
  //HSL has a hue range of 0-360. Once you breach 360, HSL automatically knows what's going on and adjusts accordingly. I don't know how this is done. Perhaps it simply subtracts (360 * x) behind the scenes, yet when you console.log the value, it still returns something greater than 360. Interesting. Below, we accomodate for the scenario in which HSL does not perform this function automatically.
  if(hue >= 360){
    hue=0;
  }
  if(ctx.lineWidth >= 100 || ctx.lineWidth <= 1){
    direction = !direction;
  }
  if(direction){
    ctx.lineWidth++;
  }else{
    ctx.lineWidth--;
  }
}



canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mousedown', (e) => {
isDrawing=true;
//Below ensures that when we mousedown, the line starts at the current mouse position instead of coordinates 0,0
[lastX, lastY] = [e.offsetX,e.offsetY];
});
canvas.addEventListener('mouseup', () => isDrawing=false);
canvas.addEventListener('mouseout', () => isDrawing=false);
