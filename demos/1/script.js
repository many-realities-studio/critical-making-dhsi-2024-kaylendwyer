function setup() {
  createCanvas(400, 400);
  background(255);


  // BIRD V. 1
  //
  //
  var ctx = canvas.getContext("2d");

  // Draw the bird's body
  ctx.beginPath();
  ctx.ellipse(250, 250, 100, 60, Math.PI / 4, 0, 2 * Math.PI);
  ctx.fillStyle = "#FFD700";
  ctx.fill();
  ctx.stroke();

  // Draw the bird's wing
  ctx.beginPath();
  ctx.moveTo(250, 250);
  ctx.quadraticCurveTo(300, 200, 350, 250);
  ctx.quadraticCurveTo(300, 300, 250, 250);
  ctx.fillStyle = "#FF6347";
  ctx.fill();
  ctx.stroke();

  // Draw the bird's head
  ctx.beginPath();
  ctx.arc(190, 190, 40, 0, 2 * Math.PI);
  ctx.fillStyle = "#FFD700";
  ctx.fill();
  ctx.stroke();

  // Draw the bird's beak
  ctx.beginPath();
  ctx.moveTo(150, 200);
  ctx.lineTo(170, 200);
  ctx.lineTo(170, 180);
  ctx.closePath();
  ctx.fillStyle = "#FF6347";
  ctx.fill();
  ctx.stroke();

  // Draw the bird's eye
  ctx.beginPath();
  ctx.arc(180, 180, 5, 0, 2 * Math.PI);
  ctx.fillStyle = "#000000";
  ctx.fill();


}
