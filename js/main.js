const canvas = document.createElement('canvas'),
  ctx = canvas.getContext('2d');

let radius = 400;

let width = canvas.width = window.innerWidth,
  height = canvas.height = window.innerHeight;

window.addEventListener('resize', function () {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  cx = title.position().left + title.width() * 1.5;
});

document.body.appendChild(canvas);


const circle = (4 * (Math.sqrt(2) - 1) / 3);

let count = Math.PI;

function drawBezierCircle(cx, cy, r) {

  let c;
  const offsetX = 10 * Math.sin(count);
  const offsetY = 15 * Math.cos(count * 2);
  r = r / 2;

  count += 0.01;

  ctx.translate(cx, cy); // translate to center point

  ctx.beginPath();

  // top right
  c = circle + (0.2 * Math.sin(count));
  ctx.moveTo(offsetX, offsetY + -r);
  ctx.bezierCurveTo(
    offsetX + c * r, offsetY + -r,
    offsetX + r, offsetY + -c * r,
    offsetX + r, offsetY
  );

  // bottom right
  c = circle + (0.2 * Math.cos(count));
  ctx.bezierCurveTo(
    offsetX + r, offsetY + c * r,
    offsetX + c * r, offsetY + r,
    offsetX + 0, offsetY + r
  );

  // bottom left
  c = circle + (0.2 * Math.sin(count * 2));
  ctx.bezierCurveTo(
    offsetX + -c * r, offsetY + r,
    offsetX + -r, offsetY + c * r,
    offsetX + -r, offsetY
  );

  // top left
  c = circle + (0.2 * Math.cos(count + 1));
  ctx.bezierCurveTo(
    offsetX + -r, offsetY + -c * r,
    offsetX + -c * r, offsetY + -r,
    offsetX, offsetY + -r
  );

  ctx.fill();
}

const title = $('#title');
const introduce = $('#introduce');

let lastScrollTop = 0;

let cx = width - radius + lastScrollTop;
let cy = radius;

function render() {
  // creating a loop
  requestAnimationFrame(render);

  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, width, height);

  drawBezierCircle(cx, cy, radius);
}


$(document).ready(function () {
  render();

  $(window).scroll(function () {
    var st = $(this).scrollTop();
    // scroll down

    lastScrollTop = st;
    cx = width - radius - (1.1 * lastScrollTop) ;
  });

});
