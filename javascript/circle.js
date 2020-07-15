class Circle {
    constructor(game, x, y, radius, sAngle, eAngle, counter,id) {
        this.game = game; //passes the game object
        this.radius = radius; //radius of this circle
        this.sAngle = sAngle; //starting angle
        this.eAngle = eAngle; //ending angle
        this.x = x; //x coordinate
        this.y = y; // y coordinate
        this.counter = counter; //counter that increments everytime the circle grows
        this.id = id; //id of this circle
        this.timeFunc = setTimeout(() => this.deleteAndPush(), 1000/30);
        //this.deleteCircle();
        this.secondTimeFunc = setTimeout(() => this.deleteCircle(), 1000); 
        
    }
    //draws the circle
    drawCircle() {      
        const theCtx = this.game.ctx;
        theCtx.beginPath();
        theCtx.arc(this.x,this.y ,this.radius,this.sAngle, this.eAngle);
        theCtx.fillStyle = "blue";
        theCtx.fill();
        theCtx.stroke();

    }
    //when called, searches for this circle object in the game array and splices it out. Decrements lives by one
     deleteCircle() {
         if(this.counter > 15 && this.game.isGameOver === false) {
               if(this.game.circlesArray.length > 0) { 
                    for(let i = 0; i < this.game.circlesArray.length ; i ++) {
                        if(this.id === this.game.circlesArray[i].id ) {
                            this.game.circlesArray.splice(i,1);
                            this.game.lives --;
                           
                    }                  
                }
            }  
         }
        
            
    }
    //when called, searches for this circle object in the game array, creates a new one with the same x,y coordinates
    //but increases the radius and increases the counter. Splices out the old circle and replaces with the new circle.
    deleteAndPush() { 
        if(this.game.circlesArray.length > 0 && this.game.isGameOver === false) {
            for(let i = 0; i < this.game.circlesArray.length ; i ++) {
                if(this.id === this.game.circlesArray[i].id) {           
                    let newCircle = new Circle(this.game, this.x, this.y, this.radius +.5, 0, 2*Math.PI,this.counter +1,this.id );
                    this.game.circlesArray.splice(i,1,newCircle);
                
                }                  
            }
        }   
    }


}