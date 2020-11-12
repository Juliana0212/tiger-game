document.addEventListener ('DOMContentLoaded', () => {
const dino = document.querySelector('.dino')
const grid = document.querySelector('.grid')
const body = document.querySelector('body')
const alert = document.getElementById('alert')
let isJumping = false
//let gravity = 0.9
let isGameOver = false


function control() { // 'e' é tecla de controle
  if (!isJumping) {
    isJumping = true
    jump()
  }    
}

document.addEventListener ('keyup', control) // 'keyup' é um evento e 'control' função a invocar 

let position = 0
function jump() {

    let timerId = setInterval(function () {


       // move down
       if (position === 150) {
           clearInterval (timerId)
           console.log('down')
           let downTimerId = setInterval(function (){
               if (position === 15) { 
                   clearInterval(downTimerId)
                   isJumping = false
                }
                position -= 15
                dino.style.bottom = position + 'px'
           },20)  //tempo em miliseg
        }
       
       
        //move up
        console.log('up')
        position +=15 // position = position + 400
        dino.style.bottom = position + 'px'
    },20)
}

function generateObstacles() {
  let randomTime = Math.random() * 4000 //cactus
  let obstaclePosition = 1000 // Posição
  const obstacle = document.createElement('div')
  if (!isGameOver) obstacle.classList.add('obstacle')
  grid.appendChild(obstacle)
  obstacle.style.left = obstaclePosition + 'px'

  let timerId = setInterval(function() {
        if (obstaclePosition > 0 && obstaclePosition < 60 && position < 60) {
         clearInterval(timerId)
         alert.innerHTML = 'Game Over'
         isGameOver = true
         //remove all children
         body.removeChild(body.firstChild)
         while (grid.firstChild) {
           grid.removeChild(grid.lastChild)
         }
      
        }

     obstaclePosition -=10
     obstacle.style.left = obstaclePosition + 'px'
    },20)

  if (!isGameOver) setTimeout(generateObstacles, randomTime)
}
generateObstacles()

var button = document.getElementById("clickme"),
  count = 0;
button.onclick = function() {
  count += 1;
  button.innerHTML = "Click me: " + count;
  control();
};


})