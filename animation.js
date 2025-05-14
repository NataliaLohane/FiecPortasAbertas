const backgroundCanvas = document.getElementById("background-canvas");
const ctxBackground = backgroundCanvas.getContext("2d");

backgroundCanvas.width = window.innerWidth;
backgroundCanvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  backgroundCanvas.width = window.innerWidth;
  backgroundCanvas.height = window.innerHeight;
});

class Block {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * backgroundCanvas.width;
    this.y = -20;
    this.size = 10 + Math.random() * 10;
    this.speed = 1 + Math.random() * 3;
  }

  update() {
    this.y += this.speed;
    if (this.y > backgroundCanvas.height) this.reset();
  }

  draw() {
    ctxBackground.fillStyle = "rgba(255, 0, 0, 0.8)";
    ctxBackground.fillRect(this.x, this.y, this.size, this.size);
  }
}

const blocks = Array.from({ length: 100 }, () => new Block());

function animate() {
  ctxBackground.clearRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);
  blocks.forEach((block) => {
    block.update();
    block.draw();
  });
  requestAnimationFrame(animate);
}

animate();
