const myGame = new Game();

myGame.drawBackground();
let startBtn = document.getElementById('button');
startBtn.addEventListener('click',() => {
    myGame.welcomeMessage();

    setTimeout(() => {
    startGame()
    }, 5000);
    });

 
 



function startGame() {
myGame.startGame()
setInterval(() => {let score = document.querySelector('#score p').innerHTML = myGame.score;},500);

let livesInterval = setInterval(() => {let lives = document.querySelector('#lives p').innerHTML = myGame.lives;
// if(myGame.lives === 0) {
//     clearInterval(livesInterval);
// }
},500);

setInterval(() => {let lives = document.querySelector('#accuracy p').innerHTML = myGame.accuracy;},500);

}