class Game {
    constructor() {
        this.myCanvas = document.getElementById('my-canvas');
        this.ctx = this.myCanvas.getContext('2d');
        this.radius = 5; //radius of the starting circle
        this.score = 0; //starting score
        this.numClicks = 0; //holds the number of clicks on the canvas
        this.onTargetClicks = 0; //holds the number of clicks that were on a circle object
        this.accuracy = 100; //starting accuracy
        this.lives = 3; //starting lives
        this.circlesArray = []; //empty array that holds each circle object
        this.startingIntervalTime = 1750; //starting interval at which a new circle is created and pushed to the array;
        this.intvervalId = undefined;  //this global variable to needed to keep track of of startingInterval everytime it is 
                                        //decremented and recalled with new shorter interval
        this.isGameOver = false;

    }
 
startGame() { 
    this.drawBackground();
    this.intvervalId = setInterval(() => {
        this.pushToArrayCircle(); //initial call to start creating and pushing circle object to array
    }, this.startingIntervalTime);

    // this.pushToArrayCircle();

    const thisInterval = setInterval(() => { 
        this.clearCanvas();  
        this.drawBackground();
        this.circlesArray.forEach(element => { //loops through array and calls the draw method on each circle in array
            element.drawCircle();
        });
        // for(let i = 0; i < this.circlesArray.length; i++) {
        //     console.log(this.circlesArray[i]);
        // }
        
        
        
        if(this.lives === 0 ) { //conditions for when to end the game
            this.gameOver(thisInterval);
        }
    }, 1000/60);

    this.myCanvas.addEventListener('click',(event) => {
        //if statement that increases the speed at which circles are created and added to the array
        //based on score. Does not let the interval fall below 300
        // if(this.score % 5 === 0 && this.startingIntervalTime >= 250 && this.score !== 0) {
        //     this.startingIntervalTime -= 250; // speeds interval by specified value
        //     clearInterval(this.intvervalId); //clears current interval
        //     this.intvervalId = this.pushToArrayCircle(); //recalls same interval, but with new, faster time
        // }
        
        this.difficultyIncrease();
        let rect = this.myCanvas.getBoundingClientRect(); //returns size on an element and its position relative to viewport
        let position = {
            x: event.clientX - rect.left, //gets x coordinate of click
            y: event.clientY - rect.top, //gets y coordinate of click
        };
        this.numClicks ++; //increases num of clicks everytime a click is registered on canvas
        
        //checks to see if the registered mouse click is within any current circle in the array
        // with each click it increases the number of on target clicks and your score. Also takes the circle out of the array
        for(let i = 0; i < this.circlesArray.length; i ++) {
            if(this.isInteresect(position, this.circlesArray[i])) {
                this.onTargetClicks ++;
                this.scoreIncrease(this.circlesArray[i]);
                clearTimeout(this.circlesArray[i].timeFunc)
                this.circlesArray.splice(i,1);
            }
        }
    this.accuracy = Number(((this.onTargetClicks/this.numClicks) * 100).toFixed(0)); //calculates accuracy with every mouseclick
    });
    
}
//calls the create circle method and pushes that circle into the array
// sets the interval time to the constuctor variable. Returns the interval ID.
// pushToArrayCircle() {
//     let tempInterval = setInterval(() => {
//         this.circlesArray.push(this.createCircle()); 
//         console.log('in the pushToArrayCircle interval');
//         console.log(tempInterval);
//     }, this.startingIntervalTime);
//     return tempInterval;
// }

pushToArrayCircle() {
    this.circlesArray.push(this.createCircle());  
}
//this only pushes to array 3 times
// pushToArrayCircle() {
//     for(let i =0; i < 2; i++) {this.circlesArray.push(this.createCircle());}
// }

//creates and returns a circle with a random x coordinate, y coordinate, and id number
createCircle() {
    let x = Math.floor(Math.random() * (this.myCanvas.width - (this.radius * 2)) + (this.radius * 2)) ;
    let y = Math.floor(Math.random() * (this.myCanvas.height - (this.radius * 2)) + (this.radius * 2)) ;
    let circle = new Circle(this, x, y, this.radius, 0,2*Math.PI,0, Math.random());
    return circle;
}

//draws background
drawBackground() {
    this.ctx.fillStyle = 'gray';
    this.ctx.fillRect(0,0, this.myCanvas.width, this.myCanvas.height);
}
//clears background
clearCanvas() {
    this.ctx.clearRect(0,0, this.myCanvas.width, this.myCanvas.height);
}
// first paramater is a point object which is the mouseclick x and y coordinate.
// second paramter is a circle object
// returns true if the mouse click is within the circle object
isInteresect(point,circle) {
    return Math.sqrt((point.x-circle.x) *(point.x-circle.x) + (point.y - circle.y) *(point.y - circle.y)) < circle.radius;
}


difficultyIncrease() {
    //if statement that increases the speed at which circles are created and added to the array
        //based on score. Does not let the interval fall below 300
        if(this.score  >= 10 && this.score < 20 && this.isGameOver === false) {
            this.startingIntervalTime = 1250; // speeds interval by specified value
            clearInterval(this.intvervalId); //clears current interval
            this.intvervalId = setInterval(() => {
                this.pushToArrayCircle(); //initial call to start creating and pushing circle object to array
            }, this.startingIntervalTime); //recalls same interval, but with new, faster time
        }

        if(this.score  >= 20 && this.score <34 && this.isGameOver === false) {
            this.startingIntervalTime = 1000; // speeds interval by specified value
            clearInterval(this.intvervalId); //clears current interval
            this.intvervalId = setInterval(() => {
                this.pushToArrayCircle(); //initial call to start creating and pushing circle object to array
            }, this.startingIntervalTime);//recalls same interval, but with new, faster time
        }

        if(this.score  >= 34 && this.score < 50 && this.isGameOver === false) {
            this.startingIntervalTime = 700; // speeds interval by specified value
            clearInterval(this.intvervalId); //clears current interval
            this.intvervalId = setInterval(() => {
                this.pushToArrayCircle(); //initial call to start creating and pushing circle object to array
            }, this.startingIntervalTime);//recalls same interval, but with new, faster time
        }

        if(this.score  >= 50 && this.score < 100 && this.isGameOver === false) {
            this.startingIntervalTime = 400; // speeds interval by specified value
            clearInterval(this.intvervalId); //clears current interval
            this.intvervalId = setInterval(() => {
                this.pushToArrayCircle(); //initial call to start creating and pushing circle object to array
            }, this.startingIntervalTime);//recalls same interval, but with new, faster time
        }

        if(this.score  >= 101 && this.isGameOver === false) {
            this.startingIntervalTime = 275; // speeds interval by specified value
            clearInterval(this.intvervalId); //clears current interval
            this.intvervalId = setInterval(() => {
                this.pushToArrayCircle(); //initial call to start creating and pushing circle object to array
            }, this.startingIntervalTime);//recalls same interval, but with new, faster time
        }
}

scoreIncrease(circle) {
    if(circle.radius >= 5 && circle.radius < 15) {
        this.score += 3
    }
    if(circle.radius >= 15 && circle.radius < 22) {
        this.score += 2
    }
    if(circle.radius >= 22) {
        this.score += 1
    }
}

gameOverMessage() {
    if(this.score <=40) {
        this.ctx.font = '50px Arial';
        this.ctx.fillStyle = 'yellow';
        this.ctx.fillText('Game Over', 115, this.myCanvas.height / 3);
        this.ctx.font = '30px Arial';
        this.ctx.fillStyle = 'yellow';
        this.ctx.fillText(`Your score is ${this.score}, You suck!`, 75, this.myCanvas.height / 2);
    }
    if(this.score > 40 && this.score <= 100) {
        this.ctx.font = '50px Arial';
        this.ctx.fillStyle = 'yellow';
        this.ctx.fillText('Game Over', 115, this.myCanvas.height / 3);
        this.ctx.font = '30px Arial';
        this.ctx.fillStyle = 'yellow';
        this.ctx.fillText(`Your score is ${this.score}, Not bad!`, 75, this.myCanvas.height / 2);
        
    }
    if(this.score > 100) {
        this.ctx.font = '50px Arial';
        this.ctx.fillStyle = 'yellow';
        this.ctx.fillText('Game Over', 115, this.myCanvas.height / 3);
        this.ctx.font = '30px Arial';
        this.ctx.fillStyle = 'yellow';
        this.ctx.fillText(`Your score is ${this.score}, You're great!`, 75, this.myCanvas.height / 2);
        
    }
}
// game over screen
gameOver(intervalFunc) {
        this.clearCanvas();
        this.drawBackground();
        clearInterval(this.intvervalId);
        clearInterval(intervalFunc);
      
        this.circlesArray.forEach((circle) => {
            clearTimeout(circle.timeFunc);
            clearTimeout(circle.secondTimeFunc);
        });
        this.isGameOver = true;
        this.gameOverMessage();
           
}

welcomeMessage() {
    this.clearCanvas();
    this.drawBackground();
    this.ctx.font = '20px Arial';
    this.ctx.fillStyle = 'yellow';
    this.ctx.fillText('Click on the circles!' , 20, this.myCanvas.height / 3);
    this.ctx.font = '20px Arial';
    this.ctx.fillStyle = 'yellow';
    this.ctx.fillText('The faster you click on them, the more points you get!', 20, this.myCanvas.height / 2.5);
    this.ctx.font = '20px Arial';
    this.ctx.fillStyle = 'yellow';
    this.ctx.fillText('0 lives and the game is over!', 20, this.myCanvas.height / 2.15);

}


}  


