const canvas =document.getElementById("game-canvas");
  const ctx = canvas.getContex('2d')

  const box = 20;
  //DEFININDO A POSIÇÃO INICIAL DA COBRINHA//
  let snake = [( x: 9 * box, y: 10 * box)];
  let direction = "RIGHT";

  let food = {
    x: Math.floor(Math.random() *19 + 1) * box,
    y: Math.floor(Math.random() *19 + 1) * box,
  };

  let score = 0;
  const scoreElement = document.getElementById("score");

  const reiniciarBotton = document.getElementById("button-reiniciar");

  document.addEventListener("keydown", directionControl);

  function directionControl(event) {
    const key = event.keycode;

    if (key == 37 && direction != 'RIGHT') {
      direction = 'LEFT';
    } else if (key == 38 && direction != 'DOWN') {
      direction = "UP";
    }else if (key == 39 && direction !=  'LEFT') {
      direction = 'RIGHT';
    }else if (key == 40 && direction != 'UP') {
      direction = 'DOWN';
    }

  }

  //VERICANDO COLISÕES//'

  function collision(head, array) {
    for (let i=1; i < array.lenght; i++) {
      if (head.x === array[1].x && head.y === array[1].y) {
        return true;  
      }
    }
    return false;
  }
